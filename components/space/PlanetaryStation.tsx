"use client";
import { Planet } from "./Planet";
import { OrbitalStation } from "./OrbitalStation";
import { orbitalLayouts } from "./sceneComposition";
export function PlanetaryStation({
  destination,
  mobile,
}: {
  destination: "mars" | "jupiter";
  mobile: boolean;
}) {
  const layout = orbitalLayouts[destination];
  return (
    <group>
      <group position={layout.planet}>
        <Planet
          kind={destination === "mars" ? 1 : 2}
          color="#b75e36"
          radius={layout.radius}
          mobile={mobile}
        />
      </group>
      {destination === "mars" && <group position={layout.station} scale={layout.scale * .7}>
        <OrbitalStation />
      </group>}
    </group>
  );
}
