"use client";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import type {Group} from "three";
import {JovianLabelLayout} from "./JovianLabelLayout";
import {Planet} from "./Planet";
import {SceneLabel} from "./SemanticSystems";
import {knowledgeOrbits,minorOrbits,moonPosition,type MoonOrbit} from "./orbitalMotion";
import {experience} from "@/data/experience";
import type {JourneyModel} from "./JourneyController";
function Moon({orbit,index,model}:{orbit:MoonOrbit;index?:number;model:JourneyModel}){
 const group=useRef<Group>(null);
 useFrame(({clock})=>{
  if(group.current)group.current.position.set(...moonPosition(orbit,model.reduced?0:clock.elapsedTime));
 });
 return <group ref={group} position={moonPosition(orbit,0)} name={index===undefined?"Minor Jovian moon":experience[2].pipeline[index]}>
  <Planet radius={orbit.size*(index!==undefined&&model.mobile?1.6:1)} kind={3} color={index===undefined?"#77828b":index%2?"#b5aa93":"#91acbb"} mobile={model.mobile}/>
  {index!==undefined&&<SceneLabel position={[0,-orbit.size-.2,.12]} title={experience[2].pipeline[index]} model={model} index={3} lunar/>}
 </group>;
}
export function JovianSystem({model}:{model:JourneyModel}){
 return <group name="Jovian knowledge system" scale={model.mobile?.64:1} position={[0,.35,-1.3]}>
  <Planet kind={2} color="#b75e36" radius={2.5} mobile={model.mobile}/>
  {knowledgeOrbits.map((orbit,index)=><Moon key={index} orbit={orbit} index={index} model={model}/>)}
  {minorOrbits.map((orbit,index)=><Moon key={"minor"+index} orbit={orbit} model={model}/>)}
  <JovianLabelLayout model={model}/>
 </group>;
}
