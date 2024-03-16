import { setupScene, createMesh, THREE } from '../utils';

let canvasSize = [500, 500];

const canvases = {
    'geometry': document.getElementById('canvas-geometry'),
};

const scenes = {
    'geometry': setupScene(
        canvases['geometry'],
        canvasSize[0],
        canvasSize[1],
        undefined, // TODO: convert from named arguments to an object
        true,
        2
    )
}

const scene = scenes['geometry'];

// Clear scene from objects
scene.scene.clear();

// const verticesPositionArray = new Float32Array([
//     // 1st triangle
//     0,0,0, // v0
//     0,1,0, // v1
//     1,1,0,  // v2
//     // 2nd triangle
//     1,1,0,  // v2
//     0,0,0, // v0
//     1,0,0, // v3
// ]);

const nTriangles = 100;
const verticesPositionArray = new Float32Array(nTriangles * 3 * 3);
for (let i = 0; i < nTriangles * 3 * 3; i++) {
    verticesPositionArray[i] = Math.random() - 0.5;
}

const verticesPositionAttributes = new THREE.BufferAttribute(verticesPositionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', verticesPositionAttributes);

const mesh = createMesh({ color: 0xff0000, geometry, wireframe: true });

scene.scene.add(mesh);

const loop = () => {
    // Render scenes
    for(const sceneName in scenes) {
        scenes[sceneName].renderer.render(
            scenes[sceneName].scene,
            scenes[sceneName].camera);
    }
    window.requestAnimationFrame(loop);
}

loop();