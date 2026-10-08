"use client";
import {useContext,useMemo} from "react";
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";
import {AnnotationRegistry} from "../ui/SceneAnnotations";
import {destinations} from "@/data/navigation";
import {projects} from "@/data/projects";
import type {JourneyModel} from "./JourneyController";
/** Captions follow real projected scene anchors. Jupiter retains its existing moon layout. */
export function ResponsiveLabelLayout({model}:{model:JourneyModel}){
 const registry=useContext(AnnotationRegistry);
 const metrics=useMemo(()=>new Set(projects[0].metrics.map(([title])=>"4:"+title)),[]);
 useFrame(({size})=>{
  if(!registry)return;
  const compact=size.width<=1100;
  const index=Math.round(model.progress.get()*8);
  if(index<1||index>7||index===3||(!compact&&index!==4&&index!==6))return;
  const section=document.getElementById(destinations[index].id);
  const stage=section?.querySelector<HTMLElement>(".system-window")?.getBoundingClientRect();
  if(!stage)return;
  const placed:{x:number;y:number;w:number;h:number}[]=[];
  const nodes=[...registry.entries()].filter(([id,node])=>id.startsWith(index+":")&&node.style.visibility==="visible");
  nodes.sort((a,b)=>Number(a[1].dataset.anchorY)-Number(b[1].dataset.anchorY));
  for(const [id,node] of nodes){
   if(compact&&metrics.has(id)){node.style.visibility="hidden";continue;}
   const ax=Number(node.dataset.anchorX),ay=Number(node.dataset.anchorY),w=node.offsetWidth,h=node.offsetHeight;
   const left=w/2+16,right=size.width-w/2-16;
   const top=Math.max(105+h/2,stage.top+h/2+10),bottom=Math.min(size.height-65-h/2,stage.bottom-h/2-10);
   if(bottom-top<70){node.style.visibility="hidden";continue;}
   const candidates:[number,number][]=compact?[[0,-24],[0,24]]:[[0,0]];
   for(const radius of [48,72,104,140,180])for(const [dx,dy] of [[0,-1],[0,1],[-1,0],[1,0],[-.8,-.7],[.8,-.7],[-.8,.7],[.8,.7]])candidates.push([dx*radius,dy*radius]);
   const options=candidates.map(([dx,dy])=>({x:MathUtils.clamp(ax+dx,left,right),y:MathUtils.clamp(ay+dy,top,bottom)}));
   const point=options.find(p=>!placed.some(r=>Math.abs(r.x-p.x)<(r.w+w)/2+9&&Math.abs(r.y-p.y)<(r.h+h)/2+9));
   if(!point){node.style.visibility="hidden";continue;}
   placed.push({...point,w,h});
   node.dataset.callout=String(compact||Math.hypot(point.x-ax,point.y-ay)>12);
   node.style.transform=`translate3d(${point.x}px,${point.y}px,0) translate(-50%,-50%)`;
   const stem=node.querySelector<HTMLElement>(".scene-label-stem");
   if(stem){
    const dx=ax-point.x,dy=ay-point.y,length=Math.hypot(dx,dy);
    const edge=Math.min(1,(w/2+3)/Math.max(.001,Math.abs(dx)),(h/2+3)/Math.max(.001,Math.abs(dy)));
    stem.style.left=(w/2+dx*edge)+"px";stem.style.top=(h/2+dy*edge)+"px";
    stem.style.width=(length*(1-edge))+"px";stem.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;stem.style.opacity=length>12?".5":"0";
   }
  }
 });
 return null;
}
