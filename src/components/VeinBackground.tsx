"use client";
import { Canvas, useFrame, extend } from "@react-three/fiber";
// type shim removed for compatibility across @react-three/fiber versions
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";

/** GLSL - animated “vein” ridges using fbm noise lines */
const fragment = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  // hash + noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(in vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x)+ (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float f=0., a=.5;
    for(int i=0;i<5;i++){ f+=a*noise(p); p*=2.02; a*=.5; }
    return f;
  }

  void main(){
    vec2 uv = vUv;
    // stretch slightly to simulate flow
    vec2 p = uv*vec2(3.2, 1.8);
    float t = uTime*0.04;

    // base field
    float field = fbm(p*3.6 + vec2(t*0.6, -t*0.6));
    // vein lines: tighter, thinner ridge
    float ridges = smoothstep(0.78, 0.95, 1.0-abs(field*2.0-1.0));
    // subtle pulsation
    float pulse = 0.5 + 0.5*sin(uTime*1.2);

    vec3 ink = vec3(0.043,0.059,0.078);   // #0b0f14
    vec3 rose = vec3(0.72,0.35,0.41);     // vein rose
    vec3 blue = vec3(0.06,0.43,0.65);     // surgical

    vec3 col = mix(ink, mix(blue, rose, ridges), 0.18 + 0.12*ridges*pulse);
    // vignette
    float vg = smoothstep(0.0,0.72,length(uv-0.5));
    col = mix(col, ink, vg*0.3);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertex = /* glsl */`
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const VeinMaterial = shaderMaterial({ uTime: 0 }, vertex, fragment);
extend({ VeinMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements { veinMaterial: any }
  }
}

function FullscreenPlane() {
  const ref = useRef<any>(null);
  useFrame((_, dt) => { ref.current.uTime += dt; });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <veinMaterial ref={ref as any} />
    </mesh>
  );
}

export default function VeinBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas gl={{ antialias: true }} camera={{ position: [0,0,1], fov: 45 }}>
        <ambientLight intensity={0.3} />
        {/* shader on a fullscreen plane */}
        <FullscreenPlane />
      </Canvas>
      {/* graceful fallback if WebGL disabled via CSS gradient */}
      <div className="hidden no-webgl:block absolute inset-0 bg-gradient-to-b from-ink to-[#0e1620]" />
    </div>
  );
}
