import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

export default class Sphere {

  constructor({context}){

    this.geo = new SphereBufferGeometry(10,10,10);
    this.mat = new MeshBasicMaterial({
      color: 0x0000ff
    });

    this.context = context;
    this.mesh = new Mesh(this.geo, this.mat);

    this.pos = {
      x: 0,
      y: 0,
      z: 0
    };

  }

  setup(){
    this.context.scene.add(this.mesh);
  }

  // setPos(vec){
  //   // this.mesh.position.set(...vec);
  // }

  // add(s,v){
  //
  //   this.pos[s] += v;
  //
  //   // this.setPos([ this.pos.x, this.pos.y, this.pos.z ]);
  //
  // }

  beep(msg){
    console.log(msg);
  }

}
