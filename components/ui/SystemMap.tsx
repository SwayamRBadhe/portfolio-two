"use client";
import JovianMap from "./JovianMap";
import { useId } from "react";
import { experience } from "@/data/experience";
import { observationTitles, tenantServices, architectureNotes, reasoningAnnotations } from "@/data/scene-annotations";

type MapKind = "station" | "mars" | "jupiter" | "ai-station" | "tenant" | "observatory";
type Node = { note?: string; label: string; x: number; y: number; moon?: number; core?: boolean };
export default function SystemMap({ kind, selected = 0, onSelect }: { kind: MapKind; selected?: number; onSelect?: (index: number) => void }) {
  const titleId = useId();
  if(kind==="jupiter")return <JovianMap/>;
  let nodes: Node[];
  let paths: string[];
  let height = 300;
  if (kind === "tenant") {
    height = 350;
    nodes = [{ label: "TenantLens platform", x: 300, y: 145, core: true }, ...tenantServices.map((label,moon) => ({label,moon,x:[90,510,300][moon],y:[70,70,275][moon]}))];
    paths = ["M275 135 Q195 100 90 70", "M325 135 Q405 100 510 70", "M300 172 L300 275"];
  } else if (kind === "ai-station") {
    height = 350;
    nodes = [...reasoningAnnotations[0].labels.map((label,n)=>({label,note:reasoningAnnotations[0].notes[n],x:[65,225,385][n],y:60})),...reasoningAnnotations[1].labels.map((label,n)=>({label,note:reasoningAnnotations[1].notes[n],x:[65,225,385][n],y:255})),{label:"ClearPath AI",note:"Two pipelines / one application",x:525,y:165,core:true}];
    paths = ["M65 60 L225 60 L385 60 Q525 60 525 165", "M65 255 L225 255 L385 255 Q525 255 525 165"];
  } else if (kind === "observatory") {
    height=360;
    nodes=[...observationTitles.map((label,n)=>({label,x:[90,300,510][n],y:[145,70,145][n]})),{label:"AWS certification",note:"Solutions Architect / Associate",x:450,y:275}];
    paths=["M90 145 Q195 120 300 70 Q405 120 510 145", "M510 145 C590 185 540 290 450 275 C390 260 420 195 510 145"];
  } else if (kind === "station") {
    nodes=experience[0].pipeline.map((label,n)=>({label,x:[100,500,500,100][n],y:[65,65,210,210][n]}));
    paths=["M100 65 L500 65 Q550 65 550 140 Q550 210 500 210 L100 210"];
  } else {
    const steps=experience[1].pipeline;
    nodes=steps.map((label,n)=>({label,note:architectureNotes[0][n],x:[75,300,525,525,300,75][n],y:n<3?65:210}));
    paths=["M70 140 A230 90 0 1 0 530 140 A230 90 0 1 0 70 140 Z"];
  }
  return <figure className={"compact-system map-"+kind} aria-labelledby={titleId} style={{aspectRatio:600/height}}>
    <figcaption id={titleId} className="sr-only">{kind === "tenant" ? "One TenantLens platform, three service moons" : kind === "ai-station" ? "Retrieval and explainable machine learning converge in ClearPath AI" : kind === "observatory" ? "Education milestones along the observatory route" : kind === "mars" ? "Mars colony backend architecture" : "Operating station modernization pathway"}</figcaption>
    <svg viewBox={`0 0 600 ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><pattern id={titleId+"-moon"} width="1" height="1" patternContentUnits="objectBoundingBox"><image href="/textures/moon.webp" width="1" height="1" preserveAspectRatio="xMidYMid slice"/></pattern></defs>
      {paths.map((d,n)=><path key={d} d={d} className={kind==="ai-station"&&n===1?"map-path path-ml":"map-path"}/>) }
      {nodes.map((node,n)=><g key={node.label} className={node.moon!==undefined?"map-moon"+(node.moon===selected?" selected":""):"map-node"} data-moon={node.moon}>
        {kind==="observatory"?(n===1?<g><rect x={node.x-14} y={node.y-7} width={28} height={14}/><path d={`M${node.x-23} ${node.y-12}v24 M${node.x+23} ${node.y-12}v24`}/></g>:n===2?<g><circle cx={node.x} cy={node.y} r={15}/><circle cx={node.x} cy={node.y} r={20} className="core-boundary"/></g>:n===3?<g><rect x={node.x-5} y={node.y-5} width={10} height={10}/><path d={`M${node.x-13} ${node.y-8}v16 M${node.x+13} ${node.y-8}v16`}/></g>:<circle cx={node.x} cy={node.y} r={11}/>):kind==="ai-station"&&node.core?<g className="map-research-core"><rect x={node.x-21} y={node.y-17} width={42} height={34} rx={2}/><path d={`M${node.x-36} ${node.y-11}h15 M${node.x-36} ${node.y+11}h15 M${node.x+21} ${node.y-23}v46 M${node.x+29} ${node.y-23}v46 M${node.x} ${node.y-17}v-24 l13 -6`}/></g>:kind==="station"?<rect x={node.x-12} y={node.y-7} width={24} height={14} rx={3}/>:<circle cx={node.x} cy={node.y} r={node.core?25:node.moon!==undefined?9:4}/>} 
        {node.core&&kind!=="ai-station"&&<circle cx={node.x} cy={node.y} r={29} className="core-boundary"/>}
        {node.moon!==undefined&&<text x={node.x} y={node.y+4} textAnchor="middle">{node.moon+1}</text>}
        {kind!=="tenant"&&kind!=="observatory"&&!node.core&&<text x={node.x} y={node.y-15} textAnchor="middle">{n+1}</text>}
      </g>)}
    </svg>
    {nodes.map(node=>{
      const style={left:`${node.x/6}%`,top:`${(node.y+(node.core?36:21))/height*100}%`};
      return kind==="tenant"&&node.moon!==undefined?<button key={node.label} style={style} className="map-label" onClick={()=>onSelect?.(node.moon!)} aria-pressed={selected===node.moon}><small>Moon {node.moon+1}</small>{node.label}</button>:<p key={node.label} style={style} className="map-label">{node.label}{node.note&&<small>{node.note}</small>}{node.core&&kind==="tenant"&&<small>Spring Security / JWT</small>}</p>;
    })}
  </figure>;
}
