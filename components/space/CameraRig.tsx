"use client";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import type { JourneyModel } from "./JourneyController";
import { destinationFrames } from "./sceneComposition";
import { SPACING } from "./JourneyController";
export function CameraRig({ model }: { model: JourneyModel }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    pointer.current = { x: 0, y: 0 };
    if (model.mobile || model.reduced) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    const reset = () => {
      pointer.current = { x: 0, y: 0 };
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, [model.mobile, model.reduced]);
  useFrame(({ camera, size }, delta) => {
    const p = model.progress.get() * 8;
    const destination = model.reduced ? Math.round(p) : p;
    const z = 10 - destination * SPACING;
    const factor = model.reduced ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) * 4);
    const x = model.mobile || model.reduced ? 0 : pointer.current.x * 0.18;
    const y = model.mobile
      ? -1.7
      : model.reduced
        ? 0
        : pointer.current.y * 0.12;
    camera.position.z = MathUtils.lerp(camera.position.z, z, factor);
    camera.position.x = MathUtils.lerp(camera.position.x, x, factor);
    camera.position.y = MathUtils.lerp(camera.position.y, y, factor);
    const current = Math.min(8, Math.floor(destination));
    const next = Math.min(8, current+1);
    const blend = destination-current;
    const focus = MathUtils.lerp(model.focusOffsets.current[current] ?? 0, model.focusOffsets.current[next] ?? 0, blend);
    const frameY = MathUtils.lerp(destinationFrames[current][model.mobile?"mobile":"desktop"][1], destinationFrames[next][model.mobile?"mobile":"desktop"][1], blend);
    const focal = size.height / (2*Math.tan(48*Math.PI/360));
    const pitch = focus===0 ? (model.mobile ? 0.16 : 0) : Math.atan2(frameY-y,10)+Math.atan(focus/focal);
    camera.rotation.x = MathUtils.lerp(camera.rotation.x, pitch, factor);
    camera.rotation.y = MathUtils.lerp(camera.rotation.y, (model.mobile ? -0.24 : -0.28) - x * 0.045, factor);
  });
  return null;
}
