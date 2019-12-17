import {
  PlaneBufferGeometry,
  MeshBasicMaterial, Mesh,
  ShaderMaterial,
  Vector2, DoubleSide
} from 'three';

import { snoise } from './noise.js';

export default class FlowField {
  constructor({context}){

    this.config = {
      uniforms: {
        "u_time": {
          value: 0.0
        },
        "u_resolution": {
            value: new Vector2()
        },
        "amp": {
            value : 10.0
        }
      },
      defines: {
        PI: Math.PI
      },
      vertexShader: `
        uniform float u_time;
        varying vec2 vUv;
        uniform float amp;

        ${snoise}

        void main(){
          vUv = uv;

          float nice_time = u_time * 0.1;

          vec3 directionVec = normalize(position);

          vec3 newPosition  = directionVec;
          newPosition.z = snoise(
                              (directionVec.xy * 1.8)
                              + nice_time
                          ) * amp;

          gl_Position = projectionMatrix
                          * modelViewMatrix
                          * vec4(newPosition+position, 1.0);
      }
      `,
      fragmentShader: `
        uniform vec2 u_resolution;
        uniform float u_time;
        varying vec2 vUv;

        float cubicPulse( float c, float w, float x ){
          x = abs(x - c);
          if( x>w ) return 0.0;
          x /= w;
          return 1.0 - x*x*(3.0-2.0*x);
        }

        void main(){
          vec2 st = vUv;

          float pct = cubicPulse( 0.5,0.2,fract(st.x * 100.) );

          vec3 color = vec3(pct);

          gl_FragColor = vec4(color, pct);
        }
      `,
      wireframe: false,
      side: DoubleSide,
      transparent: true
    };

    // this.context = context;
    this.scene = context.scene;

    this.mat = new ShaderMaterial(this.config);
    this.geo = new PlaneBufferGeometry( 120,     // width
                                        220,    // height
                                        100,    // width Segments
                                        100     // height Segments
                                      );

    this.mesh = new Mesh(this.geo, this.mat);

  }

  setup(){

    this.config.uniforms["u_time"].value = 0.0;
    this.config.uniforms["u_resolution"].value = [
    	window.innerWidth,
    	window.innerHeight
    ];

    this.mesh.position.z = -85;
    this.mesh.rotation.x = Math.PI * -90 / 180;
    this.scene.add(this.mesh);

  }

  update(){
    this.config.uniforms["u_time"].value += 0.1;
  }

  uniform_time(x){
    let val = Math.sin(x);
    // this.config.uniforms["u_time"].value = val;
  }
}
