"use client";
import {useContext,useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";
import {AnnotationRegistry,annotationId} from "../ui/SceneAnnotations";
import {experience} from "@/data/experience";
import type {JourneyModel} from "./JourneyController";
/** Lay out captions after all moon anchors update; hardware and orbit positions are never moved. */
export function JovianLabelLayout({model}:{model:JourneyModel}){
 const registry=useContext(AnnotationRegistry),positions=useRef(new Map<string,{x:number;y:number}>());
 useFrame(({size})=>{
  if(!registry||Math.abs(model.progress.get()*8-3)>=.3)return;
  const stage=document.querySelector<HTMLElement>("#iconsult .system-window")?.getBoundingClientRect();if(!stage)return;
  const nodes=experience[2].pipeline.map(title=>({title,node:registry.get(annotationId(3,title))})).filter(item=>item.node&&item.node.style.visibility==="visible").map(item=>({title:item.title,node:item.node!,x:Number(item.node!.dataset.anchorX),y:Number(item.node!.dataset.anchorY)}));
  const targets=new Map<string,{x:number;y:number}>();
  if(model.mobile){
   const ordered=[...nodes].sort((a,b)=>a.x-b.x);
   for(const side of [0,1])ordered.slice(side*3,side*3+3).sort((a,b)=>a.y-b.y).forEach((item,row)=>targets.set(item.title,{x:side===0?68:size.width-68,y:stage.top+stage.height*(.23+row*.25)}));
  }else{
   const placed:{x:number;y:number;w:number;h:number}[]=[];
   [...nodes].sort((a,b)=>a.y-b.y).forEach(item=>{
    const w=item.node.offsetWidth,h=item.node.offsetHeight;
    let target={x:MathUtils.clamp(item.x,w/2+24,size.width-w/2-24),y:MathUtils.clamp(item.y,stage.top+h/2+12,stage.bottom-h/2-12)};
    for(const [dx,dy] of [[0,0],[0,50],[0,-50],[-90,0],[90,0],[0,100],[0,-100]]){
     const candidate={x:MathUtils.clamp(target.x+dx,w/2+24,size.width-w/2-24),y:MathUtils.clamp(target.y+dy,stage.top+h/2+12,stage.bottom-h/2-12)};
     if(!placed.some(p=>Math.abs(p.x-candidate.x)<(p.w+w)/2+10&&Math.abs(p.y-candidate.y)<(p.h+h)/2+10)){target=candidate;break;}
    }
    placed.push({...target,w,h});targets.set(item.title,target);
   });
  }
  nodes.forEach(item=>{
   const target=targets.get(item.title);if(!target)return;
   const previous=positions.current.get(item.title)??target;
   const point={x:MathUtils.lerp(previous.x,target.x,model.reduced?1:.22),y:MathUtils.lerp(previous.y,target.y,model.reduced?1:.22)};
   positions.current.set(item.title,point);
   item.node.style.transform=`translate3d(${point.x}px,${point.y}px,0) translate(-50%,-50%)`;
   const stem=item.node.querySelector<HTMLElement>(".lunar-label-stem");
   if(stem){const dx=item.x-point.x,dy=item.y-(point.y-item.node.offsetHeight/2),length=Math.hypot(dx,dy);stem.style.width=length+"px";stem.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;stem.style.opacity=length>18?".5":"0";}
  });
 });
 return null;
}
