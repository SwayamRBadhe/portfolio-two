import type { RefObject } from "react";
import type { MotionValue } from "framer-motion";
export interface JourneyModel {
  progress: MotionValue<number>;
  reduced: boolean;
  mobile: boolean;
  beltActive: boolean;
  focusOffsets: RefObject<number[]>;
}
export const SPACING = 28;
/** Interpolate actual HTML anchors; content length remains free to change. */
export function progressAtScroll(scroll: number, anchors: number[]) {
  if (anchors.length < 2) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (scroll < anchors[i + 1]) {
      const span = Math.max(1, anchors[i + 1] - anchors[i]);
      const t = Math.max(0, Math.min(1, (scroll - anchors[i]) / span));
      const eased = t * t * (3 - 2 * t);
      return (i + eased) / (anchors.length - 1);
    }
  }
  return 1;
}
