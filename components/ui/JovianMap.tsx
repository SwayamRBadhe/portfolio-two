"use client";
import {useEffect,useRef} from "react";
import {useReducedMotion} from "framer-motion";
import {experience} from "@/data/experience";
import {architectureNotes} from "@/data/scene-annotations";
import {knowledgeOrbits,minorOrbits,moonPosition} from "../space/orbitalMotion";
/** Texture-backed orbital fallback. Uses the same orbital elements as the WebGL system. */
export default function JovianMap(){
 const root=useRef<HTMLElement>(null),reduced=!!useReducedMotion();
 useEffect(()=>{
  const node=root.current;if(!node)return;let frame=0,visible=false;
  const paint=(time:number)=>{
   [...knowledgeOrbits,...minorOrbits].forEach((orbit,i)=>{
    const moon=node.querySelector<HTMLElement>(`[data-jovian="${i}"]`);if(!moon)return;
    const [x,y,z]=moonPosition(orbit,reduced?0:time*.001);
    moon.style.left=(50+x*8.7).toFixed(4)+"%";moon.style.top=(42-y*13).toFixed(4)+"%";
    moon.style.setProperty("--moon-scale",String(.8+(z+5)*.035));moon.style.zIndex=z<0?"0":"2";
   });
  };
  const tick=(time:number)=>{paint(time);if(visible&&!document.hidden&&!reduced)frame=requestAnimationFrame(tick);};
  const schedule=()=>{cancelAnimationFrame(frame);paint(performance.now());if(visible&&!document.hidden&&!reduced)frame=requestAnimationFrame(tick);};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();});observer.observe(node);
  document.addEventListener("visibilitychange",schedule);paint(performance.now());
  return ()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener("visibilitychange",schedule);};
 },[reduced]);
 return <figure ref={root} className="compact-system map-jupiter jovian-map" aria-label="Jupiter with six workflow moons and eight smaller moons">
  <div className="jovian-map-planet" aria-hidden="true"/>
  {[...knowledgeOrbits,...minorOrbits].map((orbit,i)=><div key={i} className={"jovian-map-moon"+(i<6?" important":"")} data-jovian={i} style={{left:(50+moonPosition(orbit,0)[0]*8.7).toFixed(4)+"%",top:(42-moonPosition(orbit,0)[1]*13).toFixed(4)+"%"}}>
    <span className="jovian-map-rock" style={{width:(i<6?16:5)+"px",height:(i<6?16:5)+"px"}}/>
    {i<6&&<p>{experience[2].pipeline[i]}<small>{architectureNotes[1][i]}</small></p>}
  </div>)}
 </figure>;
}
