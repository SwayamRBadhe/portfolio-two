"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {useTexture} from "@react-three/drei";
import {Suspense,useEffect,useMemo,useRef} from "react";
import {Color,IcosahedronGeometry,Object3D,SRGBColorSpace,type InstancedMesh} from "three";
import type {MotionValue} from "framer-motion";
import {beltCamera,beltRock,namedRocks} from "./asteroidLayout";
function rockGeometry(){
 const geometry=new IcosahedronGeometry(1,1),positions=geometry.attributes.position;
 for(let i=0;i<positions.count;i++){
  const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
  const relief=1+.20*Math.sin(x*4+1.7)*Math.sin(y*5-1.7)+.13*Math.sin(z*6+x*3+1.7);
  positions.setXYZ(i,x*relief,y*relief*.82,z*relief*.93);
 }
 geometry.computeVertexNormals();return geometry;
}
function Rocks({travel,reduced,visible,onFailure}:{travel:MotionValue<number>;reduced:boolean;visible:boolean;onFailure:()=>void}){
 const {size,gl,invalidate}=useThree();
 const layoutWidth=size.width;
 const map=useTexture("/textures/moon.webp",texture=>{texture.colorSpace=SRGBColorSpace;});
 const geometry=useMemo(()=>rockGeometry(),[]),object=useMemo(()=>new Object3D(),[]),color=useMemo(()=>new Color(),[]);
 const named=useRef<InstancedMesh>(null);
 useEffect(()=>travel.on("change",()=>invalidate()),[travel,invalidate]);
 useEffect(()=>{if(visible)invalidate();},[visible,reduced,invalidate]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 useEffect(()=>{
  const canvas=gl.domElement;const lost=(event:Event)=>{event.preventDefault();onFailure();};
  canvas.addEventListener("webglcontextlost",lost);return ()=>canvas.removeEventListener("webglcontextlost",lost);
 },[gl,onFailure]);
 useEffect(()=>{
  const mesh=named.current;if(!mesh)return;
   namedRocks.forEach((_,i)=>{
    const rock=beltRock(i,layoutWidth);
    object.position.set(rock.x,rock.y,rock.z);
    object.scale.set(rock.radius,rock.radius*(.72+(i%3)*.12),rock.radius);
    object.rotation.set(rock.rotation,i*.71,rock.rotation*.7);object.updateMatrix();mesh.setMatrixAt(i,object.matrix);
    color.set(i%3===0?"#b4a28b":i%2===0?"#8296a3":"#a6aaa5");mesh.setColorAt(i,color);
   });
   mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();
  invalidate();
 },[layoutWidth,object,color,invalidate]);
 useFrame(({camera,gl:renderer})=>{
  const progress=travel.get(),position=beltCamera(progress,reduced);camera.position.set(position.x,position.y,position.z);
  renderer.domElement.dataset.cameraZ=position.z.toFixed(3);renderer.domElement.dataset.travel=progress.toFixed(4);
  renderer.domElement.dataset.fragmentCount="0";renderer.domElement.dataset.namedCount=String(namedRocks.length);
  renderer.domElement.dataset.renderedFrames=String(Number(renderer.domElement.dataset.renderedFrames??0)+1);
 });
 return <group name="Perspective asteroid flight">
  <ambientLight intensity={.5}/><directionalLight position={[-6,5,8]} intensity={3.1} color="#ebdcc5"/><directionalLight position={[5,-3,-20]} intensity={1.5} color="#7f9eba"/>
  <instancedMesh ref={named} args={[geometry,undefined,namedRocks.length]}><meshLambertMaterial map={map} flatShading/></instancedMesh>
 </group>;
}
export default function AsteroidField({travel,reduced,visible,failed,onReady,onFailure}:{travel:MotionValue<number>;reduced:boolean;visible:boolean;failed:boolean;onReady:()=>void;onFailure:()=>void}){
 return <Canvas camera={{position:[0,0,30],fov:66,near:.08,far:110}} dpr={1} frameloop={failed||!visible?"never":"demand"} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} onCreated={onReady} style={{opacity:failed?0:1}}>
  <Suspense fallback={null}><Rocks travel={travel} reduced={reduced} visible={visible} onFailure={onFailure}/></Suspense>
 </Canvas>;
}
