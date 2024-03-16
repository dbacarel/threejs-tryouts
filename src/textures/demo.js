import { setupScene, createCubeMesh, THREE } from '../utils';

const canvasSize = [500, 500];

const canvases = {
    'texture-albedo': document.getElementById('canvas-texture-albedo'),
};

const scenes = {
    'texture-albedo': setupScene(
        canvases['texture-albedo'],
        canvasSize[0],
        canvasSize[1]
    )
}

const scene = scenes['texture-albedo'];

// Clear scene from objects
scene.scene.clear();





const image = new Image();

/* Textures */
//
// Manually
//
// const texture = new THREE.Texture(image);
// // map expect texture in SRGB color space
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//     texture.needsUpdate = true;
// }
// // TODO: static asset refercing must be broken in prod
// const imageURL = '/albedo.jpeg';
// image.src = imageURL;
//
// TextureLoader
//
const loadingManager = new THREE.LoadingManager(
    () => { /** onLoad */},
    () => { /** onProgress */},
    () => { /** onError */},
);
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/albedo.jpeg');
const alphaTexture = textureLoader.load('/alpha.jpeg');
const heightTexture = textureLoader.load('/height.jpeg');
const normalTexture = textureLoader.load('/normal.jpeg');
const metalnessTexture = textureLoader.load('/metalness.jpeg');
const roughnessTexture = textureLoader.load('/roughness.jpeg');
const checkerboard1024x1024Texture = textureLoader.load('/checkerboard-1024x1024.png');
const checkerboard8x8Texture = textureLoader.load('/checkerboard-8x8.png');
const minecraftTexture = textureLoader.load('/minecraft.png');

// Texture Transformations
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.offset.x = 0.3;
// colorTexture.offset.y = 0.5;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// Min filter
// We can disable mipmaps generation when using NearestFilter for Min filter
// minecraftTexture.generateMipmaps = false;
// minecraftTexture.minFilter = THREE.NearestFilter;
// Mag filter
minecraftTexture.magFilter = THREE.NearestFilter;
minecraftTexture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.ConeGeometry(1, 1, 32);
// const geometry = new THREE.TorusGeometry(1, .35, 32, 100);
const material = new THREE.MeshBasicMaterial({ map: minecraftTexture });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0,3)
scene.camera.lookAt(mesh.position)

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