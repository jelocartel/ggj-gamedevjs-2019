/* global AFRAME, THREE */

module.exports = {
    tick() {
        const ratio = window.innerWidth / window.innerHeight;
        const cars = document.querySelectorAll('.car');
        const offset = 1.75;
        const camera = this.el.children[0].object3D.children[0];
        // camera.aspect = ratio;

        const boundingBox = new THREE.Box3();
        const group = new THREE.Group();

        cars.forEach((car) => {
            group.add(car.object3D.clone());
        });

        boundingBox.setFromObject(group);

        const center = boundingBox.getCenter();
        const size = boundingBox.getSize();

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = (maxDim / 4) / Math.tan(fov * 2);

        // cameraZ *= offset;
        camera.position.z = cameraZ;
        camera.updateProjectionMatrix();
        camera.lookAt(center);



    }
}
