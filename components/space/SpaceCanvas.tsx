"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import type { Group } from "three";
import { Earth } from "./Earth";
import { DataPath, ObservationRoute, ReasoningStreams, ResearchArchitecture, SceneLabel, StationMeaning } from "./SemanticSystems";
import { SpaceLighting } from "./SpaceLighting";
import { Starfield } from "./Starfield";
import { CameraRig } from "./CameraRig";
import { destinationFrames } from "./sceneComposition";
import { PlanetaryStation } from "./PlanetaryStation";
import { OrbitalStation } from "./OrbitalStation";
import { AIResearchStation } from "./AIResearchStation";
import { JovianSystem } from "./JovianSystem";
import { TenantSystem } from "./TenantSystem";
import { Observatory } from "./Observatory";
import type { JourneyModel } from "./JourneyController";
import { SPACING } from "./JourneyController";
import {ResponsiveLabelLayout} from "./ResponsiveLabelLayout";
function ContextMonitor({ onFailure }: { onFailure: () => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}
function SceneUpdates({ model }: {
    model: JourneyModel;
}) {
    const invalidate = useThree((state) => state.invalidate);
    useEffect(() => model.progress.on("change", () => invalidate()), [model.progress, invalidate]);
    return null;
}
function Destination({ index, children, model, }: {
    index: number;
    children: React.ReactNode;
    model: JourneyModel;
}) {
    const ref = useRef<Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            const distance = Math.abs(model.progress.get() * 8 - index);
            ref.current.visible = distance < .85 && !model.beltActive;
            if (!model.reduced)
                ref.current.rotation.y =
                    Math.sin(clock.elapsedTime * 0.025 + index) * 0.08;
        }
    });
    return (<group ref={ref} scale={model.mobile ? 0.58 : 1} position={[
            ...((model.mobile
                ? destinationFrames[index].mobile
                : destinationFrames[index].desktop).slice(0, 2) as [
                number,
                number
            ]),
            -index * SPACING,
        ]}>
      {children}
    </group>);
}
export default function SpaceCanvas({ model, selected, onFailure, disabled = false, }: {
    model: JourneyModel;
    selected: number;
    onFailure: () => void;
    disabled?: boolean;
}) {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const update = () => setVisible(!document.hidden);
        document.addEventListener("visibilitychange", update);
        return () => document.removeEventListener("visibilitychange", update);
    }, []);
    return (<Canvas style={{ opacity: disabled ? 0 : 1 }} frameloop={disabled || !visible ? "never" : model.reduced || model.beltActive ? "demand" : "always"} dpr={model.mobile ? [1, 1.15] : [1, 1.5]} camera={{ position: [0, 0, 10], fov: 48, near: 0.1, far: 100 }} gl={{
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
        }}>
      <Suspense fallback={null}>
        <SceneUpdates model={model}/>
        <ContextMonitor onFailure={onFailure} />
        <SpaceLighting model={model}/>
        <Starfield model={model}/>
        <CameraRig model={model}/>
        {Array.from({ length: 9 }, (_, i) => (<Destination key={i} index={i} model={model}>
            {i === 0 || i === 8 ? (<Earth mobile={model.mobile} radius={i === 0 ? 4.3 : 3.3}/>) : i === 1 ? (<><OrbitalStation /><StationMeaning model={model}/></>) : i === 2 ? (<><PlanetaryStation destination="mars" mobile={model.mobile}/><ResearchArchitecture model={model} index={2}/></>) : i === 3 ? (<JovianSystem model={model}/>) : i === 4 ? (<group scale={model.mobile?.82:1}><AIResearchStation/><ReasoningStreams model={model}/></group>) : i === 5 ? (<group scale={0.9}>
                <TenantSystem model={model} selected={selected}/>
              </group>) : i === 6 ? <ObservationRoute model={model}/> : (<><Observatory probe mobile={model.mobile}/><DataPath points={[[0,.5,.2],[.5,1.2,-1.5],[1.8,2,-4]]} opacity={.22}/><SceneLabel position={[1.8,2.4,-4]} responsivePosition={[0,0,0]} title="Historical discovery" note="TimeLens / Wikidata" model={model} index={7}/></>)}
          </Destination>))}
        <ResponsiveLabelLayout model={model}/>
        <AdaptiveDpr pixelated/>
      </Suspense>
    </Canvas>);
}
