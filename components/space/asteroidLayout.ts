import {systems} from "@/data/skills";
export const beltSkills=[...new Set(systems.flatMap(system=>system.tech))];
export const BELT_DISTANCE=Math.max(36,(beltSkills.length-1)*2+36);
export const beltCamera=(progress:number,reduced=false)=>({x:reduced?0:Math.sin(progress*Math.PI*2)*.18,y:reduced?0:Math.sin(progress*Math.PI)*.12,z:30-progress*BELT_DISTANCE});
const random=(n:number)=>{const v=Math.sin((n+71)*127.1)*43758.5453;return v-Math.floor(v);};
/** Every named rock has one permanent world position; names never swap between rocks. */
export const namedRocks=beltSkills.map((name,i)=>({name,x:0,y:0,z:-6-i*2+(random(i*7+4)-.5)*1.4,radius:(.36+random(i*7+2)*.18)*1.3*(.85+random(i*7+5)*.3),rotation:random(i*7+3)*6.28}));
type Rock=typeof namedRocks[number];
const layouts=new Map<number,Rock[]>();
/** Deterministic, irregular volume. Choose well-spaced positions once per device class. */
function scatteredRocks(profile:number){
 const spread=profile===0?3.6:profile===1?8:13;
 const near=profile===0?17:14,far=profile===0?35:48;
 const rocks:Rock[]=[];
 namedRocks.forEach((rock,index)=>{
  let best={...rock,x:0,y:0},bestScore=-1;
  for(let attempt=0;attempt<64;attempt++){
   const seed=index*997+attempt*13+profile*8191+(profile===0?57524:0);
   const x=(random(seed)*2-1)*spread,y=(random(seed+1)*2-1)*6.7;
   let score=Infinity;
   for(const other of rocks){
    const depth=other.z-rock.z;if(depth>far-near)continue;
    // Compare projected spacing throughout the shared reading interval, not just in a flat plane.
    for(let distance=near;distance<=far;distance+=4){
     const otherDistance=distance-depth;if(otherDistance<near||otherDistance>far)continue;
     const dx=(x/distance-other.x/otherDistance)*5;
     const dy=(y/distance-other.y/otherDistance)*12;
     score=Math.min(score,dx*dx+dy*dy);
    }
   }
   if(score>bestScore){best={...rock,x,y};bestScore=score;}
  }
  rocks.push(best);
 });
 return rocks;
}
export function beltRock(index:number,width:number){
 const profile=width<700?0:width<1100?1:2;
 let layout=layouts.get(profile);
 if(!layout){layout=scatteredRocks(profile);layouts.set(profile,layout);}
 return layout[index];
}
export function beltProjection(rock:{x:number;y:number;z:number},progress:number,width:number,height:number,reduced=false){
 const camera=beltCamera(progress,reduced),distance=camera.z-rock.z;
 const focal=height/(2*Math.tan(66*Math.PI/360));
 return {x:width/2+(rock.x-camera.x)*focal/distance,y:height/2-(rock.y-camera.y)*focal/distance,scale:focal/distance,distance};
}
export function beltProgress(top:number,height:number,cockpitHeight:number){return Math.max(0,Math.min(1,(90-top)/Math.max(1,height-cockpitHeight)));}
