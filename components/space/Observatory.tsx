"use client";
import { useMemo } from "react";

import { Vector2 } from "three";

import { SolarArray, Strut } from "./SpaceHardware";
const mirrorSegments: [number, number][] = [];
for (let q=-2; q<=2; q++) for (let r=-2; r<=2; r++) {
  if (Math.abs(q+r)<=2) mirrorSegments.push([Math.sqrt(3)*.32*(q+r/2),1.5*.32*r]);
}
export function Probe() {
  const bowl = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const r = i * 0.058;
        return new Vector2(r, r * r * 0.55);
      }),
    [],
  );
  return (
    <group rotation={[0.25, -0.3, -0.2]} scale={0.7}>
      <mesh>
        <boxGeometry args={[0.68, 0.65, 0.8]} />
        <meshStandardMaterial
          color="#b3b8b4"
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.08, 0, 0]}>
          <SolarArray width={0.9} height={1.55} />
        </group>
      ))}
      <Strut from={[-1.55, 0, 0]} to={[1.55, 0, 0]} />
      <group position={[0, 0.5, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <latheGeometry args={[bowl, 32]} />
          <meshStandardMaterial
            color="#c3bba9"
            metalness={0.3}
            roughness={0.4}
            side={2}
          />
        </mesh>
        <Strut from={[0, 0, 0]} to={[0, 0.4, 0]} radius={0.018} />
      </group>
    </group>
  );
}
function StarCluster({ mobile }: { mobile: boolean }) {
  const points = useMemo(
    () =>
      Float32Array.from({ length: (mobile ? 40 : 100) * 3 }, (_, i) => {
        const n = Math.floor(i / 3);
        const a = n * 2.39996;
        const r = Math.sqrt(n / 100) * 3.4;
        return i % 3 === 0
          ? Math.cos(a) * r - 1.5
          : i % 3 === 1
            ? Math.sin(a) * r * 0.42 + 3.0
            : -12 - (n % 9) * 0.2;
      }),
    [mobile],
  );
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#c5d9ea"
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}
export function Observatory({
  probe = false,
  mobile = false,
}: {
  probe?: boolean;
  mobile?: boolean;
}) {
  if (probe) return <Probe />;
  return (
    <group>
      <StarCluster mobile={mobile} />
      <group rotation={[0.12, -0.32, -0.2]}>
        <mesh position={[0, 0, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.65, 0.75, 1.0, 12]} />
          <meshStandardMaterial
            color="#9ca8b1"
            metalness={0.35}
            roughness={0.42}
          />
        </mesh>
        <group rotation={[0, 0, Math.PI / 6]}>
          {mirrorSegments.map(([x, y], i) => {
            return (
              <group key={i} position={[x, y, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.31, 0.31, 0.08, 6]} />
                  <meshStandardMaterial
                    color="#74808a"
                    metalness={0.35}
                    roughness={0.4}
                  />
                </mesh>
                <mesh position={[0, 0, 0.045]} rotation={[0, 0, Math.PI / 6]}>
                  <circleGeometry args={[0.296, 6]} />
                  <meshStandardMaterial
                    color={["#cbbd9e", "#a99f89", "#bcb199"][i % 3]}
                    metalness={0.65}
                    roughness={0.2}
                    side={2}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
        {Array.from({ length: 3 }, (_, i) => {
          const a = (i * Math.PI * 2) / 3;
          return (
            <Strut
              key={i}
              from={[Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0.02]}
              to={[0, 0, 1.65]}
              radius={0.018}
            />
          );
        })}
        <mesh position={[0, 0, 1.65]}>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshStandardMaterial
            color="#9baeba"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 1.8, -0.4, -0.8]}
            rotation={[0, 0, side * 0.12]}
          >
            <SolarArray width={1} height={1.8} />
          </group>
        ))}
        <Strut from={[-2.3, -0.4, -0.8]} to={[2.3, -0.4, -0.8]} />
        {[0, 1].map((i) => (
          <mesh
            key={i}
            position={[0, -1.4 - i * 0.06, -0.5]}
            rotation={[0.45, 0, 0.1]}
            scale={[1.25, 0.48, 1]}
          >
            <circleGeometry args={[1.6, 6]} />
            <meshStandardMaterial
              color={i === 0 ? "#75818c" : "#aab3bc"}
              metalness={0.3}
              roughness={0.5}
              side={2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
