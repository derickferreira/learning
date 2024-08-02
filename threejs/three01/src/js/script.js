import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as dat from "dat.gui";

const rendered = new THREE.WebGLRenderer();

rendered.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(rendered.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, rendered.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 100, 100);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: false,
});
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff00ff,
//   wireframe: true,
// });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

const animation = () => {
  box.rotation.x += 0.05;
  box.rotation.y += 0.05;
  rendered.render(scene, camera);
};

rendered.setAnimationLoop(animation);
