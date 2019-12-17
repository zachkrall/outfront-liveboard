import {
  Scene
} from 'three';
// import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { timeFormat } from './utils/functions.js';
// import { resizeCanvas } from './utils/events.js';

import Color from './data/Color.js';

// import Debug from './utils/Debug.js';
import Camera from './utils/Camera.js';
import Renderer from './utils/Renderer.js';

import Sphere from './objects/Sphere.js';
import FlowField from './objects/Flow.js';

/* -------- PROJECT -------- */
let config    = {
                  debug: false,
                  date: false
                };
let time;
let width     = window.innerWidth;
let height    = window.innerHeight;

/* -------- SET UP THREE.JS -------- */
let container = document.body;
let canvas    = document.querySelector('#time_canvas');
let scene     = new Scene();
let camera    = new Camera(width,height);
let renderer  = new Renderer(container, canvas);
// let controls  = new OrbitControls(camera, renderer.domElement);
let context   = {
                  container: container,
                  camera: camera,
                  scene:  scene,
                  renderer: renderer
                };
// let debug     = new Debug(context, config.debug);

/* -------- OBJECTS -------- */

time = timeFormat(new Date());

// let sphere = new Sphere({
//                 context: context
//              });
let color  = new Color( context );
let flow   = new FlowField ({
                context: context
             });


/* -------- START -------- */
renderer.setup();
camera.setup();
// debug.setup();
// sphere.setup();
color.setup(time);

flow.setup();


/* -------- ANIMATION LOOP -------- */
function loop() {

  /* Tick Tock */
  let t = config.date || new Date();
  time  = timeFormat(t);

  flow.update();
  flow.uniform_time(time.now * 0.01);

  // sphere.mesh.position.x = Math.sin(time.now * 0.001) * 20;

  // console.log(time.now);
  // sphere.add('x',0.1);
  //
  // sphere.beep(this);

  // debug.update(time);
  // controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

/* -------- EVENT LISTENERS -------- */
// window.addEventListener('resize', ()=>{
//   width = window.innerWidth, height = window.innerHeight;
//   resizeCanvas(camera, renderer, width, height);
// }, false);
