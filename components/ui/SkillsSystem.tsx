"use client";
import {Component,useCallback,useEffect,useRef,useState,type ReactNode} from "react";
import dynamic from "next/dynamic";
import {useReducedMotion,useMotionValue} from "framer-motion";
import {beltSkills,namedRocks,beltRock,beltProjection,beltProgress} from "../space/asteroidLayout";
const AsteroidField=dynamic(()=>import("../space/AsteroidField"),{ssr:false});
class FieldBoundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}componentDidCatch(){this.props.onFailure();}render(){return this.state.failed?null:this.props.children;}
}
export default function SkillsSystem({webglAvailable}:{webglAvailable:boolean}){
 const [near,setNear]=useState(false),[visible,setVisible]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 const travel=useMotionValue(0),flight=useRef<HTMLDivElement>(null),section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null);
 const reduced=!!useReducedMotion(),onReady=useCallback(()=>setReady(true),[]),onFailure=useCallback(()=>setFailed(true),[]);
 useEffect(()=>{
  const node=section.current?.querySelector(".belt-cockpit");if(!node)return;
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting&&webglAvailable)setNear(true);setVisible(entry.isIntersecting&&!document.hidden);},{rootMargin:"150px"});
  const visibility=()=>setVisible(!document.hidden&&node.getBoundingClientRect().bottom>0&&node.getBoundingClientRect().top<innerHeight+150);
  observer.observe(node);document.addEventListener("visibilitychange",visibility);
  return ()=>{observer.disconnect();document.removeEventListener("visibilitychange",visibility);};
 },[webglAvailable]);
 useEffect(()=>{
  let frame=0;
  const labels=stage.current?.querySelectorAll<HTMLElement>("[data-skill]");
  let metrics:{half:number;height:number}[]=[];
  let needsMeasure=true;
  let lastProgress=-1;
  let width=0,height=0;
  let disposed=false;
  let previouslyVisible=new Set<number>();
  const labelOffsets=new Map<number,number>();
  const fallback=stage.current?.querySelectorAll<HTMLElement>("[data-fallback-rock]");
  const update=()=>{
   frame=0;const node=flight.current,viewport=stage.current,cockpit=node?.querySelector<HTMLElement>(".belt-cockpit");if(!node||!viewport||!cockpit)return;
   const progress=beltProgress(node.getBoundingClientRect().top,node.offsetHeight,cockpit.offsetHeight);
   if(progress===lastProgress&&!needsMeasure)return;
   lastProgress=progress;
   if(needsMeasure){
    viewport.style.width=document.documentElement.clientWidth+"px";
    width=viewport.offsetWidth;height=viewport.offsetHeight;
    metrics=Array.from(labels??[],label=>({half:Math.max(45,label.offsetWidth/2),height:label.offsetHeight}));
    needsMeasure=false;
   }
   travel.set(progress);section.current?.setAttribute("data-flight-progress",String(progress));
   viewport.style.opacity=String(Math.min(1,progress/.025,(1-progress)/.055));
   const occupied:{x:number;y:number;w:number;h:number}[]=[];
   const candidates=namedRocks.map((_,i)=>{const rock=beltRock(i,width);return {rock,i,p:beltProjection(rock,progress,width,height,reduced)};}).sort((a,b)=>Number(previouslyVisible.has(b.i))-Number(previouslyVisible.has(a.i))||a.p.distance-b.p.distance);
   const placements=candidates.map(({rock,i,p})=>{
    const label=labels?.[i];if(!label)return;
    const {half,height:labelHeight}=metrics[i],anchorY=p.y+rock.radius*p.scale*.85+12;
    const collides=(y:number)=>occupied.some(rect=>Math.abs(rect.x-p.x)<rect.w/2+half+8&&Math.abs(rect.y-y)<rect.h/2+labelHeight/2+10);
    const y=[labelOffsets.get(i)??0,0,24,-24].map(offset=>anchorY+offset).find(value=>!collides(value))??anchorY;
    const collision=collides(y);
    const inFrame=occupied.length<(width<700?8:width<1100?12:20)&&!collision&&p.distance>(width<700?17:14)&&p.distance<(width<700?35:48)&&p.x>half+16&&p.x<width-half-16&&y>35&&y<height-45;
    if(inFrame){occupied.push({x:p.x,y,w:half*2,h:labelHeight});labelOffsets.set(i,y-anchorY);}else labelOffsets.delete(i);
    return {label,inFrame,p,y,i};
   });
   previouslyVisible=new Set(placements.filter(placement=>placement?.inFrame).map(placement=>placement!.i));
   placements.forEach(placement=>{
    if(!placement)return;
    const {label,inFrame,p,y}=placement;
    label.style.visibility=inFrame?"visible":"hidden";
    label.style.opacity=inFrame?"1":"0";
    label.style.transform=`translate3d(${p.x}px,${y}px,0) translate(-50%,-50%)`;
    label.dataset.distance=p.distance.toFixed(2);
   });
   if(viewport.dataset.renderer!=="webgl")namedRocks.forEach((_,i)=>{
    const rock=beltRock(i,width);
    const item=fallback?.[i];if(!item)return;
    const p=beltProjection(rock,progress,width,height,reduced),diameter=rock.radius*p.scale*2;
    const shown=p.distance>.35&&p.distance<150&&p.x>-diameter&&p.x<width+diameter&&p.y>-diameter&&p.y<height+diameter;
    item.style.visibility=shown?"visible":"hidden";if(!shown)return;
    item.style.width=diameter+"px";item.style.height=diameter*.82+"px";
    item.style.transform=`translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%) rotate(${rock.rotation}rad)`;
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const measure=()=>{needsMeasure=true;schedule();};
  const fontsLoaded=()=>{if(!disposed)measure();};
  document.fonts.ready.then(fontsLoaded);
  schedule();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",measure);
  const observer=new ResizeObserver(measure);if(stage.current)observer.observe(stage.current);
  return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",measure);};
 },[travel,reduced,ready,failed,webglAvailable]);
 return <section ref={section} id="skills" className="systems-section technology-belt asteroid-skills">
  <div className="section-heading"><h2>The systems that<br/>carry the work.</h2><p>Fly through a field of technologies. Each named asteroid is a tool I use; scrolling carries you into the belt and toward the next destination.</p></div>
  <div className="systems-layout"><div ref={flight} className="belt-flight"><div className="belt-cockpit"><p className="belt-reach">Technology asteroid belt<span>Scroll to travel</span></p>
   <div ref={stage} className="asteroid-stage" role="group" aria-label="Forward flight through the technology asteroid belt" data-skill-count={beltSkills.length} data-renderer={ready&&!failed&&webglAvailable?"webgl":"fallback"}>
    <div className="asteroid-fallback" aria-hidden="true">{namedRocks.map((rock,i)=><span key={rock.name} className="flight-fallback-rock" data-fallback-rock={i} data-skill-name={rock.name}/>)}</div>
    {near&&<div className="asteroid-canvas" aria-hidden="true"><FieldBoundary onFailure={onFailure}><AsteroidField travel={travel} reduced={reduced} visible={visible&&webglAvailable} failed={failed||!webglAvailable} onReady={onReady} onFailure={onFailure}/></FieldBoundary></div>}
    {namedRocks.map((rock,i)=><span key={rock.name} className="flight-skill-label" data-skill={i} aria-hidden="true">{rock.name}</span>)}
   </div>
  </div></div><ul className="sr-only" aria-label="Skills encountered in the asteroid belt">{beltSkills.map(name=><li key={name}>{name}</li>)}</ul></div>
 </section>;
}
