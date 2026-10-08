import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {architectureRelayPositions,orbitalLayouts} from '../components/space/sceneComposition.ts';
import {marsStationOrbit,knowledgeOrbits,minorOrbits,moonPosition} from '../components/space/orbitalMotion.ts';
const mars=orbitalLayouts.mars,planet=new Vector3(...mars.planet),station=new Vector3(...mars.station),stationRadius=mars.stationBound*mars.scale*.7;
assert.deepEqual(marsStationOrbit[0],marsStationOrbit.at(-1));
for(const [x,y,z] of marsStationOrbit){
 assert.ok(Math.abs(((x+1)/2.3)**2+((y-.1)/1.1)**2-1)<1e-12,'Station path must be elliptical');
 const point=new Vector3(x,y,z);assert.ok(point.distanceTo(planet)>mars.radius*1.015+.2);assert.ok(point.distanceTo(station)>stationRadius+.1);
}
assert.ok(station.distanceTo(planet)>mars.radius*1.015+stationRadius+.8);
for(const p of architectureRelayPositions)assert.ok(new Vector3(...p).distanceTo(planet)>mars.radius*1.015+.275);
assert.equal(knowledgeOrbits.length,6);assert.equal(minorOrbits.length,8);
for(const property of ['radius','speed','inclination','longitude'])assert.equal(new Set(knowledgeOrbits.map(orbit=>orbit[property])).size,6);
for(const orbit of [...knowledgeOrbits,...minorOrbits])for(let time=0;time<600;time+=3){const position=moonPosition(orbit,time);assert.ok(Math.abs(Math.hypot(...position)-orbit.radius)<1e-10);assert.ok(Math.hypot(...position)>2.5*1.015+orbit.size*1.6+.15,'Moon intersects Jupiter');}
console.log('Closed station ellipse, unchanged Mars node clearances and all 14 independent Jovian orbital envelopes passed.');
