/* global AFRAME, THREE */

module.exports = {
    tick() {
        const cars = document.querySelectorAll('.car');
        const offset = 10;
        const camera = this.el.children[0].object3D.children[0];
        // console.log(camera);
        // return;
        const boundingBox = new THREE.Box3();
        const group = new THREE.Group();

        cars.forEach((car) => {
            group.add(car.object3D.clone());
        });

        // get bounding box of object - this will be used to setup controls and camera
        boundingBox.setFromObject(group);

        const center = boundingBox.getCenter();
        const size = boundingBox.getSize();

        // get the max side of the bounding box (fits to width OR height as needed )
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

        cameraZ *= offset; // zoom out a little so that objects don't fill the screen

        camera.position.z = cameraZ;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

        camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();
        camera.lookAt(center)

    }
}
