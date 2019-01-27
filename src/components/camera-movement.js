/* global AFRAME, THREE */

module.exports = {
    tick() {
        const ratio = window.innerWidth / window.innerHeight;
        const cars = document.querySelectorAll('.car');
        const offset = 1;
        const camera = this.el.children[0].object3D.children[0];
        camera.aspect = ratio;

        // console.log(camera);
        // return;
        const boundingBox = new THREE.Box3();
        const group = new THREE.Group();

        cars.forEach((car) => {
            group.add(car.object3D.clone());
        });

        boundingBox.setFromObject(group);

        const center = boundingBox.getCenter();
        // console.log
        const size = boundingBox.getSize();

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = (maxDim / 2 / ratio) / Math.tan(fov / 2);

        cameraZ *= offset;
        camera.position.z = cameraZ;
        camera.position.x = center.x;
        // camera.position.y = center.y;
        console.log(center, camera.rotation);
        // camera.position.z = center.z;
        // camera.position.x = center.x;
        // console.log(camera.position);
        // const minZ = boundingBox.min.z;
        // const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

        // camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();
        camera.lookAt(center);
        // camera.lookAt(cars[0].object3D.position);


    }
}
