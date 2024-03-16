import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Objects
// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// green cube
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh2 = new THREE.Mesh(geometry2, material2);
// blue cube
const geometry3 = new THREE.BoxGeometry(1, 1, 1);
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh3 = new THREE.Mesh(geometry3, material3);

// Object positions
mesh.position.set(0, 0, 0);
mesh2.position.set(1.5, 0, 0);
mesh3.position.set(3, 0, 0);

const group = new THREE.Group();
scene.add(group);

group.add(mesh);
group.add(mesh2);
group.add(mesh3);


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10);

camera.position.set(0, 0, 3);
scene.add(camera);

// Canvas
const canvas = document.getElementById('sceneCanvas');

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);


// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Clock
// const clock = new THREE.Clock();
camera.lookAt(mesh.position)

const loop = () => {
    /** -- Time based animation -- */
    // const elapsedTime = clock.getElapsedTime();
    // const sinElapsed = Math.abs(Math.sin(elapsedTime));
    // const cosElapsed = Math.abs(Math.cos(elapsedTime));
    // camera.position.set(0, sinElapsed * 4, cosElapsed * 4);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));


    /** -- Animation based on mouse movement -- */
    camera.position.x  = cursor.x * 10;
    camera.position.y  = cursor.y * 10;


    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

const cursor = {x: 0, y: 0};

window.addEventListener('mousemove', (evt) => {
    cursor.x = evt.clientX / sizes.width - 0.5;
    cursor.y = evt.clientY / sizes.height - 0.5;
    console.log(cursor)
})
loop();