"use client";
import { useEffect, useMemo } from "react";
import { DoubleSide, Quaternion, ShaderMaterial, Vector3 } from "three";
import type { Position3 } from "./sceneComposition";
const panelVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const panelFragment = `varying vec2 vUv;void main(){vec2 cells=fract(vUv*vec2(5.,9.));float seam=step(.045,cells.x)*step(.045,cells.y);float sheen=.7+.3*vUv.x;vec3 color=mix(vec3(.18,.24,.29),vec3(.045,.105,.17)*sheen,seam);gl_FragColor=vec4(color,1.);}`;
/** A framed photovoltaic surface: two draw calls, no image textures. */
export function SolarArray({
  width = 1,
  height = 2,
}: {
  width?: number;
  height?: number;
}) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: panelVertex,
        fragmentShader: panelFragment,
        side: DoubleSide,
      }),
    [],
  );
  useEffect(() => () => material.dispose(), [material]);
  return (
    <group>
      <mesh>
        <boxGeometry args={[width, height, 0.045]} />
        <meshStandardMaterial
          color="#a0aeb7"
          metalness={0.45}
          roughness={0.45}
        />
      </mesh>
      <mesh material={material} position={[0, 0, 0.027]}>
        <planeGeometry args={[width - 0.07, height - 0.07]} />
      </mesh>
    </group>
  );
}
export function Strut({
  from,
  to,
  radius = 0.025,
}: {
  from: Position3;
  to: Position3;
  radius?: number;
}) {
  const { length, center, rotation } = useMemo(() => {
    const a = new Vector3(...from),
      b = new Vector3(...to);
    const axis = b.clone().sub(a);
    return {
      length: axis.length(),
      center: a.add(b).multiplyScalar(0.5),
      rotation: new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        axis.normalize(),
      ),
    };
  }, [from, to]);
  return (
    <mesh position={center} quaternion={rotation}>
      <cylinderGeometry args={[radius, radius, length, 6]} />
      <meshStandardMaterial color="#9babb7" metalness={0.4} roughness={0.5} />
    </mesh>
  );
}
