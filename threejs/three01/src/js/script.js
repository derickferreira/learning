import * as THREE from "three";
import * as dat from "dat.gui";

// to change the view
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

const sphereGeometry = new THREE.SphereGeometry(1, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x9900ff,
  wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
scene.add(sphere);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x33333333);
scene.add(ambientLight);

// Directional light =================================================================
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 30, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(dLightShadowHelper);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: true,
  bounceSpeed: 0.01,
  // widthSegments: 21,
};

gui.addColor(options, "sphereColor").onChange((value) => {
  sphere.material.color.set(value);
});

gui.add(options, "wireframe").onChange((value) => {
  sphere.material.wireframe = value;
});

gui.add(options, "bounceSpeed", 0, 0.1);

// if (options.wireframe) {
//   gui
//     .add(options, "widthSegments", 1, 100)
//     .step(1)
//     .onChange((value) => {
//       sphere.geometry.dispose();
//       sphere.geometry = new THREE.SphereGeometry(1, value);
//     });
// }

let step = 0;

const animate = (time) => {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.bounceSpeed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

// https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho
// 29:00
