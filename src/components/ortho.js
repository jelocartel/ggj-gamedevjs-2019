/* global AFRAME, THREE */

AFRAME.registerComponent('ortho', {
    init() {
        let scene = this.el.sceneEl;
        scene.addEventListener('loaded', () => {
            this.originalCamera = scene.camera;
            this.cameraParent = scene.camera.parent;
            this.orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10);
            this.cameraParent.add(this.orthoCamera);
            scene.camera = this.orthoCamera;
        });
    },
    remove() {
        this.cameraParent.remove(this.orthoCamera);
        this.el.sceneEl.camera = this.originalCamera;
    }
});
