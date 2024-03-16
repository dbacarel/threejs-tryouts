import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const createCubeMesh = function (opts = {}) {
    opts.geometry = new THREE.BoxGeometry(1, 1, 1, opts.widthSegments || 1);
    return createMesh(opts);
}

const createMesh = function (opts) {
    const { color, wireframe = false, geometry} = opts;
    const material = new THREE.MeshBasicMaterial({ color, wireframe });
    return new THREE.Mesh(geometry, material);
}

/**
 * Boilerplate scene configuration for demo pages
 */
const setupScene = function (canvas, canvasWidth, canvasHeight, opt_camera, opt_wireframe, opt_widthSegments, opt_enableControls = true) {
    if (!canvas) {
        throw Error('setupScene: canvas is undefined');
    }
    if (canvasHeight === undefined || canvasWidth === undefined) {
        throw Error('canvas height/width is undefined')
    }

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const cubeMeshRed = createCubeMesh({ color: 0xff0000, wireframe: !!opt_wireframe, widthSegments: opt_widthSegments});
    const cubeMeshGreen = createCubeMesh({ color: 0x00ff00, wireframe: !!opt_wireframe, widthSegments: opt_widthSegments });
    const cubeMeshBlue = createCubeMesh({ color: 0x0000ff, wireframe: !!opt_wireframe, widthSegments: opt_widthSegments });


    // Object positions
    cubeMeshRed.position.set(0, 0, 0);
    cubeMeshGreen.position.set(1.5, 0, 0);
    cubeMeshBlue.position.set(3, 0, 0);

    const group = new THREE.Group();
    group.add(cubeMeshRed);
    group.add(cubeMeshGreen);
    group.add(cubeMeshBlue);

    scene.add(group);


    // Sizes
    const sizes = {
        width: canvasWidth,
        height: canvasHeight
    }

    // Camera
    const aspectRatio = sizes.width / sizes.height;
    const camera = opt_camera ?? new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 10);

    camera.position.set(0, 0, 5);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio || 1)

    // Axes helper
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    if (!!opt_enableControls) {
        /* ***************** OrbitControls ***************** */
        const orbitControl = new OrbitControls(
            camera,
            renderer.domElement);
        orbitControl.autoRotate = true;
        orbitControl.enableDamping = true;
    }

    // Clock
    const clock = new THREE.Clock();
    // camera.lookAt(cubeMeshRed.position)
    return {
        scene,
        camera,
        renderer,
        clock,
        objects: [
            cubeMeshRed,
            cubeMeshGreen,
            cubeMeshBlue,
        ]
    }
}

export { THREE, createCubeMesh, createMesh, setupScene }