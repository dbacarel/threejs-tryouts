import { setupScene, createCubeMesh, THREE } from '../utils';
import { RGBELoader } from 'three/addons/loaders/RGBELoader';

const canvasSize = [800, 800];

const materialsNames = [
    'basic',
    'normal',
    'matcap',
    'depth',
    'lambert',
    'phong',
    'toon',
    'standard',
    'physical'
];

const canvases = {};
const scenes = {};


/* *************************** SCENEs SETUP *************************** */
for (const materialName of materialsNames) {
    canvases[materialName] = document.getElementById('canvas-' + materialName + '-material');
    scenes[materialName] = setupScene(
        canvases[materialName],
        canvasSize[0],
        canvasSize[1]
    );

    // Scene setup
    scenes[materialName].scene.clear();
    scenes[materialName].camera.position.set(0, 0, 3);
}



/* *************************** TEXTURES *************************** */
const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load('/albedo.jpeg');
const alphaTexture = textureLoader.load('/alpha.jpeg');
const ambientOcclusionTexture = textureLoader.load('/ambient_occlusion.jpeg');
const heightTexture = textureLoader.load('/height.png');
const normalTexture = textureLoader.load('/normal.jpeg');
const metalnessTexture = textureLoader.load('/metalness.jpeg');
const roughnessTexture = textureLoader.load('/roughness.jpeg');
const checkerboard1024x1024Texture = textureLoader.load('/checkerboard-1024x1024.png');
const checkerboard8x8Texture = textureLoader.load('/checkerboard-8x8.png');
const minecraftTexture = textureLoader.load('/minecraft.png');
const matcapTexture = textureLoader.load('/matcaps/3.png');
const gradientTexture = textureLoader.load('/gradients/5.jpg');

colorTexture.colorSpace = THREE.SRGBColorSpace;

// gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
/* *************************** MATERIALS *************************** */
const materials = {
    'basic': new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xFF0000),
        wireframe: false,
        opacity: 1,
        transparent: true,
        alphaMap: alphaTexture,
        // side: THREE.DoubleSide
    }),
    'normal': new THREE.MeshNormalMaterial({
        flatShading: true
    }),
    'matcap': new THREE.MeshMatcapMaterial({
        matcap: matcapTexture
    }),
    'depth': new THREE.MeshDepthMaterial({
    }),
    'lambert': new THREE.MeshLambertMaterial(),
    'phong': new THREE.MeshPhongMaterial({
        shininess: 50,
        specular: new THREE.Color(0xFF0000)
    }),
    'toon': new THREE.MeshToonMaterial({
        gradientMap: gradientTexture
    }),
    'standard': new THREE.MeshStandardMaterial({
        metalness: 1,
        roughness: 1,
        map: colorTexture,
        aoMap: ambientOcclusionTexture,
        // aoMapIntensity: 1,
        displacementMap: heightTexture,
        displacementScale: 0.2,
        metalnessMap: metalnessTexture,
        roughnessMap: roughnessTexture,
        normalMap: normalTexture,
        normalScale: new THREE.Vector2(0.5, 0.5),
        alphaMap: alphaTexture,
        transparent: true,
        wireframe: true
    }),
    'physical': new THREE.MeshPhysicalMaterial({
        metalness: 0,
        roughness: 0,
        map: colorTexture,
        aoMap: ambientOcclusionTexture,
        // aoMapIntensity: 1,
        displacementMap: heightTexture,
        displacementScale: 0.2,
        metalnessMap: metalnessTexture,
        roughnessMap: roughnessTexture,
        normalMap: normalTexture,
        normalScale: new THREE.Vector2(0.5, 0.5),
        alphaMap: alphaTexture,
        // transparent: true,
        clearcoat: 1,
        clearcoatRoughness: 11,
        // -- Sheen --
        // sheen: 1.5,
        // sheenRoughness: 3,
        // sheenColor: new THREE.Color(0x00FFFF),
        // -- Iridescence --
        iridescence: 1,
        iridescenceIOR: 3.5,
        // -- Thickness --
        transmission: 1,
        // https://en.wikipedia.org/wiki/List_of_refractive_indices
        // diamond: 2.417
        // water: 1.333
        // air: 1.000293
        // amber: 1.55
        ior: 1.55,
        thickness: 0.5
        // wireframe: true
    })
}


/* *************************** OBEJECTS *************************** */
const objects = {
    'basic': [],
    'normal': [],
    'matcap': [],
    'depth': [],
    'lambert': [],
    'phong': [],
    'toon': [],
    'standard': [],
    'physical': []
};

for (const materialName of materialsNames) {
    const material = materials[materialName];
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 12),
        material
    );
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 50, 50),
        material
    );
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 16, 32),
        material
    );

    // sphere - plane - torus
    sphere.position.set(-1.5, 0, 0);
    torus.position.set(1.5, 0, 0);

    objects[materialName].push(sphere, plane, torus);

    const scene = scenes[materialName];
    scene.scene.add(objects[materialName][0], objects[materialName][1], objects[materialName][2]);

}

/* *************************** LIGHTS *************************** */
// Required by MeshLambertMaterial, MeshPhongMaterial, MeshToonMaterial
const ambientLight_labert = new THREE.AmbientLight(0xFF0000, 1);
const pointLight_lambert = new THREE.PointLight(0x00FF00, 30);
pointLight_lambert.position.x = 0;
pointLight_lambert.position.y = 0;
pointLight_lambert.position.z = 5;

const pointLight_phong = new THREE.PointLight(0xFFFF00, 30);
pointLight_phong.position.x = 0;
pointLight_phong.position.y = 0;
pointLight_phong.position.z = 5;

const pointLight_toon = new THREE.PointLight(0xFFFFFF, 30);
pointLight_toon.position.x = 0;
pointLight_toon.position.y = 0;
pointLight_toon.position.z = 5;

const pointLight_physical = new THREE.PointLight(0xFFFFFF, 30);
pointLight_physical.position.x = 0;
pointLight_physical.position.y = 0;
pointLight_physical.position.z = 5;

scenes['lambert'].scene.add(ambientLight_labert, pointLight_lambert);
scenes['phong'].scene.add(pointLight_phong);
scenes['toon'].scene.add(pointLight_toon);
scenes['physical'].scene.add(pointLight_physical);

/* *************************** RGBE Loader *************************** */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/environmentMap/2k.hdr', (map) => {
    map.mapping = THREE.EquirectangularReflectionMapping;
    scenes['standard'].scene.background = map;
    scenes['standard'].scene.environment = map;

    scenes['physical'].scene.background = map;
    scenes['physical'].scene.environment = map;
})
/* *************************** RENDER LOOP *************************** */
const clock = scenes['basic'].clock;

const loop = () => {
    const elapsedTime = clock.getElapsedTime();
    // for (const materialName of materialsNames) {
    //     const objs = objects[materialName];
    //     objs[0].rotation.y = 0.4 * elapsedTime;
    //     objs[1].rotation.y = 0.4 * elapsedTime;
    //     objs[2].rotation.y = 0.4 * elapsedTime;
    // }


    // Render scenes
    for(const materialName of materialsNames) {
        scenes[materialName].renderer.render(
            scenes[materialName].scene,
            scenes[materialName].camera);
    }
    window.requestAnimationFrame(loop);
}

loop();