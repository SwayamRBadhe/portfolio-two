"use client";
import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { BackSide, Color, ShaderMaterial, SRGBColorSpace } from "three";
const vertex=`varying vec2 mapUv;varying vec3 normalView;
void main(){mapUv=uv;normalView=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragment=`varying vec2 mapUv;varying vec3 normalView;uniform sampler2D surfaceMap;uniform vec3 tint;uniform float exposure;
void main(){vec3 c=texture2D(surfaceMap,mapUv).rgb*tint;
  vec3 N=normalize(normalView);float sun=dot(N,normalize(vec3(-1.,.45,.7)));
  float daylight=smoothstep(-.10,.15,sun);c*=exposure*(.02+daylight*(.17+max(sun,0.)*.86));
  gl_FragColor=vec4(c,1.);
  #include <colorspace_fragment>
}`;
export function Planet({kind=0,color="#557c99",radius=3,mobile=false}:{kind?:number;color?:string;radius?:number;mobile?:boolean}){
  const source=kind===1?"mars":kind===2?"jupiter":"moon";
  const map=useTexture(`/textures/${source}.webp`,texture=>{texture.colorSpace=SRGBColorSpace;texture.anisotropy=4;});
  const material=useMemo(()=>new ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms:{surfaceMap:{value:map},exposure:{value:kind===2?.72:kind===1?.88:1},tint:{value:kind===1||kind===2?new Color("white"):new Color(color).lerp(new Color("white"),.34)}}}),[map,kind,color]);
  useEffect(()=>()=>material.dispose(),[material]);
  return <group>
    <mesh material={material} name={`${source} / Solar System Scope surface`}><sphereGeometry args={[radius,mobile?40:80,mobile?24:48]}/></mesh>
    <mesh scale={1.012}><sphereGeometry args={[radius,40,24]}/><meshBasicMaterial color={kind===1?"#b27b56":"#6d97ba"} transparent opacity={kind===1?.035:.025} side={BackSide}/></mesh>
  </group>;
}
