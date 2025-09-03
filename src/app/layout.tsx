import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Dr. Sobia Yasmeen | Hand & Plastic Surgery",
  description: "Reconstruction with Precision. Beauty with Restraint.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="text-porcelain antialiased">
        <Script id="webgl-check" strategy="beforeInteractive">
          {`
            try {
              var canvas = document.createElement('canvas');
              var ok = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
              if (!ok) document.documentElement.classList.add('no-webgl');
            } catch(e) { document.documentElement.classList.add('no-webgl'); }
          `}
        </Script>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
