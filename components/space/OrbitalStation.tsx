"use client";
import { SolarArray } from "./SpaceHardware";
/** Compact, coherent orbital architecture. Unscaled bounding radius < 3.5. */
export function OrbitalStation({ research = false }: { research?: boolean }) {
  return (
    <group rotation={[0.14, -0.28, -0.18]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 5.8, 12]} />
        <meshStandardMaterial
          color="#899aa8"
          metalness={0.45}
          roughness={0.42}
        />
      </mesh>
      {[-1.15, 0, 1.15].map((x) => (
        <group key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.34, 0.34, 0.95, 24]} />
            <meshStandardMaterial
              color={x === 0 ? "#c7d0d4" : "#8c9fac"}
              metalness={0.35}
              roughness={0.4}
            />
          </mesh>
          {[0, 1, 2, 3].map((port) => {
            const angle = port * Math.PI / 2;
            return <mesh key={port} position={[Math.cos(angle)*0.345, 0, Math.sin(angle)*0.345]} rotation={[0, Math.PI/2-angle, 0]}>
              <boxGeometry args={[0.16, 0.32, 0.014]} />
              <meshStandardMaterial color="#172b3a" metalness={0.5} roughness={0.28} />
            </mesh>;
          })}
          {[-0.46, 0.46].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.29, 0.34, 0.1, 24]} />
              <meshStandardMaterial
                color="#d2d7d5"
                metalness={0.4}
                roughness={0.42}
              />
            </mesh>
          ))}
          {[-0.26, 0.26].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.345, 0.016, 6, 32]} />
              <meshStandardMaterial color="#415769" metalness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.1, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.06, 3.75, 0.06]} />
            <meshStandardMaterial color="#a3b0b8" metalness={0.35} />
          </mesh>
          {[-1, 1].map((y) => (
            <group key={y} position={[0, y * 1.18, 0]}>
              <SolarArray width={1.3} height={1.65} />
            </group>
          ))}
        </group>
      ))}
      <group position={[0, 0.62, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.75, 16]} />
          <meshStandardMaterial color="#c3c7c2" metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.4]}>
          <circleGeometry args={[0.145, 24]} />
          <meshBasicMaterial color="#0f2234" />
        </mesh>
      </group>
      {research && (
        <group position={[0, -0.7, 0]}>
          <mesh>
            <boxGeometry args={[1.25, 0.45, 0.7]} />
            <meshStandardMaterial
              color="#8d9caa"
              metalness={0.35}
              roughness={0.45}
            />
          </mesh>
          <mesh position={[0, -0.23, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.65, 0.035, 8, 48]} />
            <meshStandardMaterial color="#b8c7ce" metalness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}
