"use client";
import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { BackSide, NoColorSpace, ShaderMaterial, SRGBColorSpace } from "three";
const vertex = `varying vec2 mapUv; varying vec3 normalView;
void main(){mapUv=uv;normalView=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
export function Earth({radius,mobile}:{radius:number;mobile:boolean}) {
  const [day,cloudMap] = useTexture(["/textures/earth-day.webp","/textures/earth-clouds.webp"],textures=>{
    textures[0].colorSpace=SRGBColorSpace; textures[0].anisotropy=4;
    textures[1].colorSpace=NoColorSpace;
  });
  const materials=useMemo(()=>({
    surface:new ShaderMaterial({vertexShader:vertex,fragmentShader:`
      varying vec2 mapUv;varying vec3 normalView;uniform sampler2D surfaceMap;
      void main(){vec3 c=texture2D(surfaceMap,mapUv).rgb;
        vec3 N=normalize(normalView),L=normalize(vec3(-.8,.35,.7));float sun=dot(N,L);
        float day=smoothstep(-.09,.15,sun);float ocean=1.-smoothstep(.015,.08,c.r);
        float reflection=pow(max(dot(reflect(-L,N),vec3(0.,0.,1.)),0.),70.)*ocean*.18;
        c=c*(.018+day*(.16+max(sun,0.)*.85))+vec3(.52,.67,.8)*reflection;
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
      }`,uniforms:{surfaceMap:{value:day}}}),
    clouds:new ShaderMaterial({vertexShader:vertex,fragmentShader:`
      varying vec2 mapUv;varying vec3 normalView;uniform sampler2D cloudMap;
      void main(){float density=texture2D(cloudMap,mapUv).r;
        float sun=max(dot(normalize(normalView),normalize(vec3(-.8,.35,.7))),0.);
        gl_FragColor=vec4(vec3(.85,.9,.96)*(.025+sun*.95),smoothstep(.12,.9,density)*.83);
        #include <colorspace_fragment>
      }`,uniforms:{cloudMap:{value:cloudMap}},transparent:true,depthWrite:false}),
    atmosphere:new ShaderMaterial({vertexShader:vertex,fragmentShader:`
      varying vec3 normalView;void main(){float rim=pow(1.-abs(normalize(normalView).z),5.);
        float sun=max(dot(normalize(normalView),normalize(vec3(-.8,.35,.7))),.08);
        gl_FragColor=vec4(.19,.48,.78,rim*sun*.42);
      }`,transparent:true,depthWrite:false,side:BackSide}),
  }),[day,cloudMap]);
  // Textures are cached/shared by Drei. Dispose only the component-owned materials.
  useEffect(()=>()=>Object.values(materials).forEach(m=>m.dispose()),[materials]);
  return <group rotation={[.08,-.45,.15]}>
    <mesh material={materials.surface} name="Earth / Solar System Scope day map"><sphereGeometry args={[radius,mobile?48:96,mobile?32:64]}/></mesh>
    <mesh material={materials.clouds} rotation={[0,.015,0]} name="Earth / Solar System Scope cloud map"><sphereGeometry args={[radius*1.008,mobile?40:64,40]}/></mesh>
    <mesh material={materials.atmosphere}><sphereGeometry args={[radius*1.025,48,32]}/></mesh>
  </group>;
}
