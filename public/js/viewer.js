import * as THREE from 'three';
import { XRButton } from 'three/examples/jsm/webxr/XRButton.js';

let camera, scene, renderer;
init();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(XRButton.createButton(renderer));

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1,1,1);
  fetch('/content/360/r1').then(r=>r.json()).then(urls=>{
    const texture = new THREE.TextureLoader().load(urls[0]);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer.setAnimationLoop(()=>{
      renderer.render(scene, camera);
    });
  });
}
