"use client";
import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useMemo, useRef } from "react";
import { CatmullRomCurve3, MathUtils, Vector3, type Group } from "three";
import { AnnotationRegistry, annotationId } from "../ui/SceneAnnotations";
import { experience } from "@/data/experience";
import { stationNotes, reasoningAnnotations, observationTitles } from "@/data/scene-annotations";
import { Observatory, Probe } from "./Observatory";
import { OrbitalStation } from "./OrbitalStation";
import { Planet } from "./Planet";
import { projects } from "@/data/projects";
import { marsStationOrbit } from "./orbitalMotion";
import { education } from "@/data/education";
import type { JourneyModel } from "./JourneyController";
import { architectureRelayPositions, type Position3 } from "./sceneComposition";
export function SceneLabel({ position, title, note, model, index, lunar=false, responsivePosition }: {
    position: Position3;
    title: string;
    note?: string;
    model: JourneyModel;
    index: number;
    lunar?: boolean;
    responsivePosition?: Position3;
}) {
    const compact=useThree(state=>state.size.width<=1100);
    const anchor = useRef<Group>(null);
    const registry = useContext(AnnotationRegistry);
    const projected = useMemo(() => new Vector3(), []);
    useFrame(({camera,size}) => {
      const node = registry?.get(annotationId(index,title));
      if (!node || !anchor.current) return;
      const distance = Math.abs(model.progress.get()*8-index);
      if (distance >= .3) { node.style.visibility="hidden"; return; }
      camera.updateMatrixWorld();
      anchor.current.updateWorldMatrix(true,false);
      projected.setFromMatrixPosition(anchor.current.matrixWorld).project(camera);
      const visible = projected.z > -1 && projected.z < 1;
      node.style.visibility=visible?"visible":"hidden";
      if (!visible) return;
      node.style.opacity=String(Math.max(0,1-distance/.3));
      const rawX=(projected.x*.5+.5)*size.width,rawY=(-projected.y*.5+.5)*size.height;
      node.dataset.anchorX=String(rawX);node.dataset.anchorY=String(rawY);
      const x=lunar?MathUtils.clamp(rawX,node.offsetWidth/2+16,size.width-node.offsetWidth/2-16):rawX;
      const y=lunar?MathUtils.clamp(rawY,120,size.height-100):rawY;
      node.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    });
    // Stable Three.js marker at every breakpoint; no DOM root, portal, or manual node cleanup.
    return <group ref={anchor} position={compact?responsivePosition??position:position} name={annotationId(index,title)} userData={{note}}/>;
}

export function DataPath({ points, color = "#9bbdd2", opacity = .45, closed=false }: {
    points: Position3[];
    color?: string;
    opacity?: number;
    closed?: boolean;
}) {
    const curve = useMemo(() => new CatmullRomCurve3((closed?points.slice(0,-1):points).map(p => new Vector3(...p)),closed).getPoints(closed?128:40), [points,closed]);
    return <Line points={curve} color={color} transparent opacity={opacity} lineWidth={.8}/>;
}
function Relay({ position, research = false }: {
    position: Position3;
    research?: boolean;
}) {
    return <group position={position} scale={0.45}><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.16, .21, .24, 12]}/><meshStandardMaterial color={research ? "#9aafb9" : "#b5a694"} metalness={.45} roughness={.34}/></mesh><mesh position={[0, 0, .13]}><circleGeometry args={[.12, 16]}/><meshBasicMaterial color={research ? "#9fbfd0" : "#bd9875"}/></mesh></group>;
}
export function ResearchArchitecture({ model, index }: {
    model: JourneyModel;
    index: 2 | 3;
}) {
    const steps=experience[1].pipeline;
    const width=useThree(state=>state.size.width);
    const compactDesktop=!model.mobile && width<1100;
    const nodes=useMemo(()=>compactDesktop?architectureRelayPositions.map(([x,y,z])=>[-1+(x+1)*.85,y,z] as Position3):architectureRelayPositions,[compactDesktop]);
    const orbit=useMemo(()=>compactDesktop?marsStationOrbit.map(([x,y,z])=>[-1+(x+1)*.85,y,z] as Position3):marsStationOrbit,[compactDesktop]);
    return <group name="Backend request route"><DataPath points={orbit} color="#d2aa7d" opacity={.7} closed/>
      <FlowParticle points={orbit} model={model} color="#f0c99a"/>
      {nodes.map((p,n)=><group key={steps[n]}><mesh position={p}><sphereGeometry args={[.075,16,12]}/><meshBasicMaterial color="#e7c39a"/></mesh><SceneLabel position={[p[0],p[1]-.4,p[2]+.15]} responsivePosition={p} title={steps[n]} model={model} index={index}/></group>)}
    </group>;
}

function FlowParticle({points,model,color}:{points:Position3[];model:JourneyModel;color:string}){
  const marker=useRef<Group>(null);
  const curve=useMemo(()=>new CatmullRomCurve3(points.map(p=>new Vector3(...p))),[points]);
  useFrame(({clock})=>{marker.current?.position.copy(curve.getPoint(model.reduced ? .5 : (clock.elapsedTime*.1)%1));});
  return <group ref={marker}><mesh><sphereGeometry args={[.045,10,8]}/><meshBasicMaterial color={color}/></mesh></group>;
}

export function StationMeaning({ model }: {
    model: JourneyModel;
}) {
    const compact=useThree(state=>state.size.width<=1100);
    const names = experience[0].pipeline;
    const points: Position3[] = [[-1.15, .2, .5], [-.4, .3, .5], [.4, .3, .5], [1.15, .2, .5]];
    const labels: Position3[] = [[-2.5, 2, .8], [-2, -2, .8], [.8, 2, .8], [1.5, -2, .8]];
    return <group rotation={[.14,-.28,-.18]}>
      {!compact&&<DataPath points={points} opacity={.3}/>}
      {points.map((p,n)=><group key={names[n]}>
        {!compact&&<DataPath points={[p,labels[n]]} opacity={.2}/>}
        <SceneLabel position={labels[n]} responsivePosition={p} title={names[n]} note={stationNotes[n]} model={model} index={1}/>
      </group>)}
    </group>;
}
export function ReasoningStreams({ model }: {
    model: JourneyModel;
}) {
    const paths=[{color:"#d6b07b",points:[[-4.25,1.45,1],[-3.1,1.55,1],[-2,1.5,1],[-1.24,.95,-.36]] as Position3[],...reasoningAnnotations[0]},{color:"#91c3df",points:[[-4.25,-1.35,1],[-3.1,-1.35,1],[-2,-1.2,1],[-1.36,-.62,-.6]] as Position3[],...reasoningAnnotations[1]}];
    return <group name="Two channels into ClearPath research station">{paths.map(path=><group key={path.color}>
      <DataPath points={path.points} color={path.color} opacity={.65}/><FlowParticle points={path.points} model={model} color={path.color}/>
      {path.labels.map((label,n)=>{const p=path.points[n];return <group key={label}><Relay position={p} research={path.color==="#91c3df"}/><SceneLabel position={[p[0],p[1]-.35,p[2]]} responsivePosition={p} title={label} note={path.notes[n]} model={model} index={4}/></group>;})}
    </group>)}<SceneLabel position={[.9,2.25,0]} responsivePosition={[.65,0,.6]} title="ClearPath AI" note="Deep-space AI research station" model={model} index={4}/>
    {projects[0].metrics.map(([title,note],n)=><SceneLabel key={title} position={([[2.9,1.5,.4],[2.9,-1.6,.4],[.6,-2.35,.5]] as Position3[])[n]} title={title} note={note} model={model} index={4}/>)}
    </group>;
}

export function ObservationRoute({ model }: {
    model: JourneyModel;
}) {
    const points: Position3[] = [[-3.6, .3, 0], [-.5, .8, -1], [2.6, .3, -2]];
    const traveler = useRef<Group>(null);
    const beacon=useRef<Group>(null);
    const route = useMemo(() => new CatmullRomCurve3([new Vector3(-3.6,.3,0),new Vector3(-.5,.8,-1),new Vector3(2.6,.3,-2)]), []);
    const beaconOrbit = useMemo<Position3[]>(()=>Array.from({length:65},(_,n)=>{
      const angle=n/64*Math.PI*2;
      return [2.6+Math.cos(angle)*2.4,.3+Math.sin(angle)*1.8,-2];
    }),[]);
    useFrame(({clock}) => { traveler.current?.position.copy(route.getPoint(MathUtils.clamp((model.progress.get()*8-5.6)/.8,0,1)));const angle=model.reduced?-.6:clock.elapsedTime*.08-.6;beacon.current?.position.set(2.6+Math.cos(angle)*2.4,.3+Math.sin(angle)*1.8,-2); });
    return <group scale={model.mobile ? .85 : 1} position={model.mobile ? [0,-1.5,0] : [0,0,0]}>
      <DataPath points={points} opacity={.55}/>
      <group ref={traveler}><mesh><sphereGeometry args={[.055,12,8]}/><meshBasicMaterial color="#e2edf5"/></mesh></group>
      {points.map((p,n)=><group key={observationTitles[n]}>
        <group position={p}>
          {n===0?<Planet radius={.42} kind={3} color="#9ca99e" mobile={model.mobile}/>:n===1?<group scale={.25}><OrbitalStation/></group>:<group scale={.64}><Observatory mobile={model.mobile}/></group>}
        </group>
        <SceneLabel position={[p[0],p[1]+(n===2?1.45:1),p[2]+.5]} responsivePosition={[p[0],p[1],p[2]+.5]} title={observationTitles[n]} note={education[2-n].dates} model={model} index={6}/>
      </group>)}
      <DataPath points={beaconOrbit} color="#c4ad7f" opacity={.24}/>
      <group ref={beacon} position={[4.5,-.8,-2]}><group scale={.28}><Probe/></group><SceneLabel position={[0,-.6,.5]} responsivePosition={[0,0,.3]} title="AWS certification beacon" model={model} index={6}/></group>
    </group>;
}
