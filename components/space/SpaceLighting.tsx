"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type DirectionalLight } from "three";
import type { JourneyModel } from "./JourneyController";
const colors = [
  "#a5c9ef",
  "#e1eaf2",
  "#e6ad80",
  "#d1c5b4",
  "#e6bc88",
  "#a8c4df",
  "#c2d3eb",
  "#c8c9c5",
  "#bad3ef",
].map((c) => new Color(c));
export function SpaceLighting({ model }: { model: JourneyModel }) {
  const light = useRef<DirectionalLight>(null);
  useFrame(() => {
    if (!light.current) return;
    const p = model.progress.get() * 8;
    const index = Math.min(7, Math.floor(p));
    light.current.color.copy(colors[index]).lerp(colors[index + 1], p - index);
  });
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight ref={light} position={[-5, 6, 8]} intensity={2} />
    </>
  );
}
