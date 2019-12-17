import { PerspectiveCamera } from 'three';

export default class Camera extends PerspectiveCamera{

  constructor( w, h ){
    super( 60, w/h, 0.1, 1000 );
  }

  setup(){
    this.resetCam();
    // window.addEventListener('keypress', (e)=>{
    //   if(e.code === 'KeyR'){
    //     this.resetCam();
    //   }
    //   if(e.code === 'KeyE'){
    //     this.position.set(469.11780980639725, 490.4187070405507, 291.663367845155);
    //     this.lookAt(0,0,0);
    //   }
    // });
  }

  resetCam(){
    this.position.set(0,30,10);
    this.lookAt(0,0,-100);
  }

}
