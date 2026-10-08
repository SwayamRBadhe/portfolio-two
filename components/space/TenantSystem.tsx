"use client";
import { Planet } from "./Planet";
import { tenantServices } from "@/data/scene-annotations";
import { DataPath, SceneLabel } from "./SemanticSystems";
import type { JourneyModel } from "./JourneyController";
import type { Position3 } from "./sceneComposition";
export function TenantSystem({ model, selected }: {
    model: JourneyModel;
    selected: number;
}) {
    const moons: Position3[] = [[-3.3, 1.6, 1.7], [2.8, 2.4, 1], [-.3, -3.5, 1.6]];
    return <group><Planet radius={2.35} kind={3} color="#486e86" mobile={model.mobile}/><SceneLabel position={[0, .5, 2.5]} responsivePosition={[0,0,2.5]} title="TenantLens platform" note="Spring Security / JWT" model={model} index={5}/>{moons.map((p, n) => {
            const length = Math.hypot(...p), start = p.map(v => v / length * 2.4) as Position3;
            return <group key={tenantServices[n]}><DataPath points={[start, [(start[0] + p[0]) / 2, (start[1] + p[1]) / 2, .9], p]} opacity={selected === n ? .65 : .25}/><group position={p}><Planet radius={.42} kind={3} color={selected === n ? "#b5c8d6" : ["#8195a7", "#ae9c83", "#839c96"][n]} mobile={model.mobile}/></group><SceneLabel position={[p[0], p[1] + .7, p[2]]} responsivePosition={p} title={tenantServices[n]} note={`Service ${n + 1} · REST API`} model={model} index={5}/></group>;
        })}</group>;
}
