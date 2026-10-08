"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, type Points, type BufferGeometry } from "three";
import type { JourneyModel } from "./JourneyController";
const vertex=`attribute float starSize;varying vec3 starColor;uniform float pointScale;
void main(){starColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(pointScale*starSize/max(1.,-mv.z),.45,4.);}`;
const fragment=`varying vec3 starColor;void main(){float radius=length(gl_PointCoord-.5);float alpha=1.-smoothstep(.16,.5,radius);gl_FragColor=vec4(starColor,alpha);}`;
function Stars({count,size,opacity,seed,dust=false}:{count:number;size:number;opacity:number;seed:number;model:JourneyModel;dust?:boolean}){
  const {positions,colors,sizes}=useMemo(()=>{
    const rand=(i:number)=>{const v=Math.sin((i+seed)*127.1)*43758.5453;return v-Math.floor(v);};
    const positions=new Float32Array(count*3),colors=new Float32Array(count*3),sizes=new Float32Array(count);
    for(let i=0;i<count;i++){
      const x=(rand(i*7)-.5)*120;
positions.set([x,dust?x*.24+Math.sin(x*.05)*6+(rand(i*7+1)-.5)*12:(rand(i*7+1)-.5)*75,20-rand(i*7+2)*300],i*3);
      sizes[i]=.55+Math.pow(rand(i*7+6),2)*1.3;
      const warm=rand(i*7+3)>.86,b=(.25+Math.pow(rand(i*7+4),.6)*.75)*opacity;
      colors.set(warm?[b,b*.86,b*.7]:[b*.78,b*.87,b],i*3);
    }return{positions,colors,sizes};
  },[count,seed,opacity,dust]);
  const points=useRef<Points<BufferGeometry,ShaderMaterial>>(null);
  const material=useMemo(()=>new ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,vertexColors:true,transparent:true,depthWrite:false,uniforms:{pointScale:{value:1}}}),[]);
  useEffect(()=>()=>material.dispose(),[material]);
  useFrame(({size:viewport,gl})=>{
    if(!points.current) return;
    const uniforms=points.current.material.uniforms;
    uniforms.pointScale.value=size*viewport.height*.5*gl.getPixelRatio();
  });
  return <points ref={points} material={material}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/><bufferAttribute attach="attributes-starSize" args={[sizes,1]}/><bufferAttribute attach="attributes-color" args={[colors,3]}/></bufferGeometry></points>;
}
export function Starfield({model}:{model:JourneyModel}){
  return <group><Stars dust count={model.mobile?800:2400} size={.035} opacity={.26} seed={754} model={model}/><Stars count={model.mobile?2600:8200} size={.06} opacity={.65} seed={923} model={model}/><Stars count={model.mobile?450:1350} size={.10} opacity={.78} seed={1253} model={model}/><Stars count={model.mobile?35:95} size={.16} opacity={.85} seed={2341} model={model}/></group>;
}
