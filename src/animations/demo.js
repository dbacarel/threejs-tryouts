import { THREE, setupScene } from '../utils';

const canvasSize = [300, 300];

const canvases = {
    'timeAnimation': document.getElementById('canvas-time-animation'),
    'mouseCameraAnimation': document.getElementById('canvas-mouse-camera-animation'),
}

const scenes = {
    'timeAnimation': setupScene(
        canvases['timeAnimation'],
        canvasSize[0],
        canvasSize[1],
        undefined,
        false,
        1,
        false
    ),
    'mouseCameraAnimation': setupScene(
        canvases['mouseCameraAnimation'],
        canvasSize[0],
        canvasSize[1],
        undefined,
        false,
        1,
        false
    )
}

const loop = () => {
    /** -- Time based animation -- */
    const elapsedTime = scenes['timeAnimation'].clock.getElapsedTime();
    const sinElapsed = Math.abs(Math.sin(elapsedTime));
    const cosElapsed = Math.abs(Math.cos(elapsedTime));
    scenes['timeAnimation'].camera.position.set(0, sinElapsed * 4, cosElapsed * 4);
    scenes['timeAnimation'].camera.lookAt(new THREE.Vector3(0, 0, 0));


    /** -- Camera position based on mouse movement -- */
    scenes['mouseCameraAnimation'].camera.position.x  = cursor.x * 10;
    scenes['mouseCameraAnimation'].camera.position.y  = cursor.y * 10;

    /** -- Moving the camera around the geometries -- */
    // camera.position.x  = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z  = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.lookAt(mesh.position)

    // Render
    scenes['timeAnimation'].renderer.render(scenes['timeAnimation'].scene, scenes['timeAnimation'].camera);
    scenes['mouseCameraAnimation'].renderer.render(scenes['mouseCameraAnimation'].scene, scenes['mouseCameraAnimation'].camera);
    window.requestAnimationFrame(loop);
}

const cursor = { x: 0, y: 0 };


const onMouseMoveHandler = (evt) => {
    cursor.x = evt.clientX / canvasSize[0] - 0.5;
    // Three.js Y-axis grows from bottom up
    cursor.y = -(evt.clientY / canvasSize[1] - 0.5);
    // console.log(cursor)
};

canvases['mouseCameraAnimation'].addEventListener('mouseenter', () => {
    window.addEventListener('mousemove', onMouseMoveHandler);
});

canvases['mouseCameraAnimation'].addEventListener('mouseleave', () => {
    window.removeEventListener('mousemove', onMouseMoveHandler);
    cursor.x = 0;
    cursor.y = 0;
})


loop();