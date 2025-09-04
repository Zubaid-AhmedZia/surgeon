"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Bounds } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ModelProps = { url?: string; enhanceSkin?: boolean };

function Model({ url, enhanceSkin }: ModelProps) {
  const { scene } = useGLTF(url!);
  useMemo(() => {
    scene.traverse((o) => {
      const m = (o as any).material as THREE.Material | undefined;
      if (m) {
        m.transparent = true;
        (m as any).depthWrite = true;
        if (enhanceSkin && (m as any).isMeshStandardMaterial) {
          const phys = m as any;
          phys.metalness = 0.0;
          phys.roughness = Math.min(0.42, phys.roughness ?? 0.42);
          phys.clearcoat = 0.6;
          phys.clearcoatRoughness = 0.25;
          phys.envMapIntensity = 0.6;
        }
      }
    });
  }, [scene, enhanceSkin]);
  return <primitive object={scene} />;
}

function FadeGroup({ children, opacityTarget, clippingPlane }: { children: React.ReactNode; opacityTarget: number; clippingPlane?: THREE.Plane | null }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    const group = ref.current;
    if (!group) return;
    group.traverse((o) => {
      const m = (o as any).material as any;
      if (m && typeof m.opacity === "number") {
        m.opacity = THREE.MathUtils.lerp(m.opacity, opacityTarget, Math.min(1, dt * 4));
        if (clippingPlane) {
          m.clippingPlanes = [clippingPlane];
        } else if (m.clippingPlanes) {
          m.clippingPlanes = null;
        }
      }
    });
  });
  return <group ref={ref}>{children}</group>;
}

export default function InteractiveHand3D({
  skinUrl = process.env.NEXT_PUBLIC_HAND_MODEL_URL,
  bonesUrl = process.env.NEXT_PUBLIC_HAND_BONES_URL,
}: { skinUrl?: string; bonesUrl?: string }) {
  const [reveal, setReveal] = useState(false);
  const hasSkin = !!skinUrl;
  const hasBones = !!bonesUrl;
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 2400);
    return () => clearTimeout(id);
  }, []);
  const controlsRef = useRef<any>(null);

  // Clip-plane wipe
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 9999), []);

  // Animator lives inside <Canvas> so R3F hooks have context
  function ClipPlaneAnimator({ plane, reveal }: { plane: THREE.Plane; reveal: boolean }) {
    const targetConst = useRef(9999);
    const progress = useRef(0);
    useEffect(() => {
      if (reveal) {
        progress.current = 0; // start wipe
      }
    }, [reveal]);
    useFrame((_, dt) => {
      // animate constant towards target
      if (reveal) {
        // sweep from -0.4 -> 0.6 in ~1.2s
        progress.current = Math.min(1, progress.current + dt / 1.2);
        const c = -0.4 + progress.current * 1.0;
        targetConst.current = c;
        plane.constant = THREE.MathUtils.lerp(plane.constant, targetConst.current, Math.min(1, dt * 8));
      } else {
        targetConst.current = 9999; // disable clipping
        plane.constant = THREE.MathUtils.lerp(plane.constant, targetConst.current, Math.min(1, dt * 6));
      }
    });
    return null;
  }

  // Gentle clockwise spin + vertical float
  function FloatSpinGroup({ children }: { children: React.ReactNode }) {
    const ref = useRef<THREE.Group>(null!);
    const t = useRef(0);
    useFrame((_, dt) => {
      t.current += dt;
      if (!ref.current) return;
      ref.current.rotation.y += dt * 0.25; // clockwise yaw
      ref.current.position.y = Math.sin(t.current * 1.2) * 0.03; // soft bob
    });
    return <group ref={ref}>{children}</group>;
  }

  // Clamp zoom so users cannot zoom out and only slightly zoom in
  function ControlClamp({ controls, zoomInFactor = 3 }: { controls: React.RefObject<any>; zoomInFactor?: number }) {
    const { camera } = useThree();
    const initialized = useRef(false);
    const frames = useRef(0);
    useFrame(() => {
      if (initialized.current) return;
      frames.current++;
      const ctrl = controls.current;
      if (!ctrl) return;
      if (frames.current < 4) return; // let <Bounds> finish fitting
      const target = ctrl.target || new THREE.Vector3();
      const dist = camera.position.distanceTo(target);
      ctrl.maxDistance = dist; // prevent zooming out past initial distance
      ctrl.minDistance = Math.max(0.1, dist * zoomInFactor); // allow small zoom-in
      initialized.current = true;
    });
    return null;
  }

  return (
    <div className="mt-6 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] mx-auto md:mx-0">
      <div className="relative aspect-[4/5] overflow-visible">
        {hasSkin ? (
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0.2, 0.1, 2.2], fov: 35 }}
            gl={{ localClippingEnabled: true, antialias: true, alpha: true }}
            onCreated={({ gl, scene }) => {
              gl.setClearColor(0x000000, 0); // transparent background
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              scene.background = null;
            }}
            style={{ background: "transparent" }}
            onClick={hasBones ? () => setReveal((v) => !v) : undefined}
          >
            {/* Animate clipping plane inside Canvas to satisfy R3F hook rules */}
            <ClipPlaneAnimator plane={plane} reveal={reveal} />
            <ambientLight intensity={0.3} />
            <directionalLight intensity={0.01} position={[2, 3, 4]} />
            <Environment preset="studio" />

            {/* Auto-fit models so they are never too large */}
            <Bounds fit clip observe margin={1.2}>
              {/* Soft float + spin for engagement */}
              <FloatSpinGroup>
                {/* Outer skin model fades out when revealing */}
                <group rotation={[0.1, -0.4, 0]}>
                  <FadeGroup opacityTarget={hasBones && reveal ? 0.08 : 1} clippingPlane={hasBones && reveal ? plane : null}>
                    {/* @ts-ignore */}
                    {hasSkin && <Model url={skinUrl} enhanceSkin={hasBones} />}
                  </FadeGroup>

                  {/* Inner bones model fades in */}
                  {hasBones && (
                    <FadeGroup opacityTarget={reveal ? 1 : 0}>
                      {/* @ts-ignore */}
                      <group>
                        <Model url={bonesUrl} />
                      </group>
                    </FadeGroup>
                  )}
                </group>
              </FloatSpinGroup>
            </Bounds>

            <OrbitControls
              ref={controlsRef}
              makeDefault
              enablePan={false}
              enableZoom
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={(Math.PI / 2) + 0.3}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
              zoomSpeed={0.6}
            />
            <ControlClamp controls={controlsRef} zoomInFactor={0.85} />
          </Canvas>
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-porcelain/70">
            <div>
              <div className="mb-1">Supply model URLs to enable 3D hand.</div>
              <code className="text-xs">NEXT_PUBLIC_HAND_MODEL_URL</code>
              <span className="mx-1">and</span>
              <code className="text-xs">NEXT_PUBLIC_HAND_BONES_URL</code>
            </div>
          </div>
        )}
        {/* Hint overlay */}
        {showHint && hasBones && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px] text-porcelain/70">
            Drag to rotate - Tap to reveal
          </div>
        )}
        {/* Reveal button */}
        {hasBones && (
          <button
            onClick={() => setReveal((v) => !v)}
            className="absolute right-2 bottom-2 z-10 rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
          >
            {reveal ? "Hide Anatomy" : "Reveal Anatomy"}
          </button>
        )}
      </div>
    </div>
  );
}

useGLTF.preload(process.env.NEXT_PUBLIC_HAND_MODEL_URL || "");
useGLTF.preload(process.env.NEXT_PUBLIC_HAND_BONES_URL || "");
