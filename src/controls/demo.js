import { setupScene } from '../utils';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { DragControls } from 'three/addons/controls/DragControls.js'

let canvasSize = [500, 500];

const canvases = {
    'orbitControls': document.getElementById('canvas-orbit-controls'),
    'dragControls': document.getElementById('canvas-drag-controls'),
};

const scenes = {
    'orbitControls': setupScene(
        canvases['orbitControls'],
        canvasSize[0],
        canvasSize[1],
        undefined,
        false,
        1,
        false
    ),
    'dragControls': setupScene(
        canvases['dragControls'],
        canvasSize[0],
        canvasSize[1],
        undefined,
        false,
        1,
        false
    )
}

/* ***************** OrbitControls ***************** */
// https://threejs.org/docs/?q=controls#examples/en/controls/OrbitControls
// Enabled by default in utils.js boiletplate
const orbitControl = new OrbitControls(
    scenes['orbitControls'].camera,
    scenes['orbitControls'].renderer.domElement);
// orbitControl.target = scene_orbit_controls.objects.cubeMeshBlue.position;
orbitControl.autoRotate = true;
orbitControl.enableDamping = true;

/* ***************** DragControls ***************** */
// https://threejs.org/docs/?q=controls#examples/en/controls/DragControls
const dragControls = new DragControls(
    scenes['dragControls'].objects,
    scenes['dragControls'].camera,
    scenes['dragControls'].renderer.domElement);
dragControls.enabled = true;


const loop = () => {
    // Render scenes
    for(const sceneName in scenes) {
        scenes[sceneName].renderer.render(
            scenes[sceneName].scene,
            scenes[sceneName].camera);
    }
    window.requestAnimationFrame(loop);
}

// window.addEventListener('resize', () => {
//     canvasSize = /* update size array */;

//     for(const sceneName in scenes) {
//         const renderer = scenes[sceneName].renderer;
//         renderer.setSize(canvasSize[0], canvasSize[1])
//     }
// })
loop();