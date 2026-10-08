export interface MoonOrbit {radius:number;inclination:number;longitude:number;speed:number;phase:number;size:number;}
/** Distinct circular orbital planes around the same Jovian center, in radians/world units. */
export const knowledgeOrbits:MoonOrbit[]=[
 {radius:3.25,inclination:.24,longitude:.15,speed:.075,phase:2.7,size:.14},
 {radius:3.65,inclination:.56,longitude:-.6,speed:.061,phase:.5,size:.18},
 {radius:4.1,inclination:.35,longitude:.8,speed:.049,phase:4.1,size:.16},
 {radius:4.55,inclination:.72,longitude:-.35,speed:.038,phase:5.6,size:.21},
 {radius:3.9,inclination:.91,longitude:1.1,speed:.054,phase:1.8,size:.15},
 {radius:4.85,inclination:.45,longitude:-.9,speed:.031,phase:3.5,size:.19},
];
export const minorOrbits:MoonOrbit[]=Array.from({length:8},(_,i)=>({radius:3.05+i*.23,inclination:.18+i*.12,longitude:i*.75,speed:.025+i*.004,phase:i*2.39,size:.055+(i%3)*.012}));
export function moonPosition(orbit:MoonOrbit,time:number):[number,number,number]{
 const angle=orbit.phase+time*orbit.speed;
 const x=Math.cos(angle)*orbit.radius,y=Math.sin(angle)*orbit.radius*Math.sin(orbit.inclination),z=Math.sin(angle)*orbit.radius*Math.cos(orbit.inclination);
 return [x*Math.cos(orbit.longitude)-z*Math.sin(orbit.longitude),y,x*Math.sin(orbit.longitude)+z*Math.cos(orbit.longitude)];
}
/** Exactly closed, station-centered ellipse. Existing Mars nodes and labels stay untouched. */
export const marsStationOrbit:[number,number,number][]=Array.from({length:129},(_,i)=>{
 const angle=(i%128)/128*Math.PI*2;
 return [-1+Math.cos(angle)*2.3,.1+Math.sin(angle)*1.1,4];
});
