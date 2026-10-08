export type Position3 = [number, number, number];
/** Art-directed destination offsets; Z spacing and scroll pacing are unchanged. */
export const destinationFrames: { desktop: Position3; mobile: Position3 }[] = [
  { desktop: [4.8, 0.35, 0], mobile: [3.2, 0.35, 0] },
  { desktop: [2.9, 1.0, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [3.0, 0.8, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [3.3, 0.6, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [3.6, 0.7, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [3.9, 0.7, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [2.8, 1.4, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [2.6, 1.0, 0], mobile: [2.6, 0.35, 0] },
  { desktop: [4.4, 0.5, 0], mobile: [2.6, 0.35, 0] },
];
// Bounds include all station geometry, end caps, panels, and any rotation.
export const orbitalLayouts = {
  mars: {
    planet: [1.2, 1, -1.4] as Position3,
    radius: 3.8,
    station: [-1, .1, 4] as Position3,
    scale: 0.32,
    stationBound: 3.5,
  },
  jupiter: {
    planet: [1.7, 0.9, -2.5] as Position3,
    radius: 4.3,
    station: [-0.9, -0.9, 3.8] as Position3,
    scale: 0.42,
    stationBound: 3.5,
  },
};

/** A connected foreground request route, physically clear of Mars and its secondary station. */
export const architectureRelayPositions: Position3[] = [[-3.2,1,4.6],[-1,1.2,4.6],[1.2,1,4.6],[1.2,-.7,4.6],[-1,-.9,4.6],[-3.2,-.7,4.6]];
/** Knowledge moons on a near-side orbital plane, outside Jupiter's spherical envelope. */
export const knowledgeMoonPositions: Position3[] = [[-3.2,1.1,4.8],[-1,1.3,4.8],[1.2,1.1,4.8],[1.2,-.7,4.8],[-1,-.9,4.8],[-3.2,-.7,4.8]];
