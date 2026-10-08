"use client";
import {SolarArray,Strut} from "./SpaceHardware";
/** An asymmetric compute spine, two data docks and an elevated communications mast. */
export function AIResearchStation(){
 return <group name="ClearPath deep-space AI research station" position={[.65,0,0]} rotation={[.12,-.24,-.08]}>
  <mesh><boxGeometry args={[1.5,1.05,1.15]}/><meshStandardMaterial color="#bbc6ca" metalness={.48} roughness={.38}/></mesh>
  <mesh position={[0,0,.59]}><boxGeometry args={[1.18,.64,.025]}/><meshStandardMaterial color="#172d3d" metalness={.5} roughness={.3}/></mesh>
  {[-.38,0,.38].map(x=><mesh key={x} position={[x,0,.615]}><boxGeometry args={[.05,.4,.025]}/><meshBasicMaterial color="#9cbdcf"/></mesh>)}
  {[-1,1].map(side=><group key={side} position={[-1.3,side*.8,0]}>
    <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.19,.19,1.25,12]}/><meshStandardMaterial color="#8195a3" metalness={.45} roughness={.4}/></mesh>
    <mesh position={[-.65,0,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.2,.04,6,20]}/><meshStandardMaterial color={side===1?"#c5a47a":"#85b4ce"} emissive={side===1?"#7c5b32":"#31586e"} emissiveIntensity={.25}/></mesh>
    <Strut from={[.4,0,0]} to={[.65,-side*.55,0]}/>
  </group>)}
  {[0,1,2].map(n=><group key={n} position={[1.05+n*.42,-.12,-.3]}>
    <mesh><boxGeometry args={[.32,1.5,.85]}/><meshStandardMaterial color="#526b7c" metalness={.42} roughness={.48}/></mesh>
    {[0,1,2,3,4].map(j=><mesh key={j} position={[0,-.5+j*.25,.14]}><boxGeometry args={[.34,.025,.03]}/><meshStandardMaterial color="#cad1cf"/></mesh>)}
  </group>)}
  <Strut from={[0,.5,0]} to={[.15,1.8,-.3]} radius={.035}/>
  <group position={[.15,1.7,-.3]} rotation={[.45,.2,-.3]}><mesh><sphereGeometry args={[.42,16,8,0,Math.PI*2,0,Math.PI*.43]}/><meshStandardMaterial color="#c5cfcd" metalness={.4} roughness={.4} side={2}/></mesh><Strut from={[0,.1,0]} to={[0,.55,0]} radius={.02}/></group>
  <group position={[.7,-1.6,-.45]} rotation={[-.2,.12,Math.PI/2]}><SolarArray width={1.3} height={2.4}/></group>
  <Strut from={[.5,-.5,-.3]} to={[.7,-1.5,-.45]}/>
  <group position={[-.05,.05,-1.1]}><mesh><octahedronGeometry args={[.55,0]}/><meshStandardMaterial color="#8a9fae" metalness={.45} roughness={.38}/></mesh></group>
 </group>;
}
