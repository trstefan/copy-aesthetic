"use client";

import { useRef } from "react";
import { useThreeBackground } from "@/hooks/useThreeBackground";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useThreeBackground(mountRef);

  return (
    <>
      <div ref={mountRef} className="fixed inset-0 pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-0 pointer-events-none" />
    </>
  );
}
