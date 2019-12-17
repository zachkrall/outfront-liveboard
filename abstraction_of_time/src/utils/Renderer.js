import { WebGLRenderer } from 'three';

export default class Renderer extends WebGLRenderer {
  constructor( _c, _canvas ){
    super({
      antialias: true,
      alpha: true,
      canvas: _canvas
    });
    this.container = _c;
  }

  setup(){

    // this.setPixelRatio(window.devicePixelRatio);
    this.setSize(window.innerWidth, window.innerHeight);
    this.setClearColor( 0x000000, 0);
    this.setClearAlpha( 0.0 );
    this.gammaOutput = true;

    // add this renderer to our container
    this.container.appendChild(this.domElement);

  }

}
