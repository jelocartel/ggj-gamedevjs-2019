/* global AFRAME, THREE */
AFRAME.registerComponent('camera-movment', {
    schema: {

    },
    init: function() {
        this.ratio = window.innerWidth / window.innerHeight;
        this.cars = document.querySelectorAll('.car');
        this.offset = 1.75;

    },
    tick: function() {
        const boundingBox = new THREE.Box3();
        const group = new THREE.Group();

        this.cars.forEach((car) => {
            group.add(car.object3D.clone());
        });

        boundingBox.setFromObject(group);

        const center = boundingBox.getCenter();
        const size = boundingBox.getSize();

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = /*camera.fov*/ 80 * (Math.PI / 180);
        let cameraZ = (maxDim / 4) / Math.tan(fov * 2);
        // console.log(maxDim)
        // this.el.object3D.position.x = maxDim > 34 ? maxDim*1.5 : 51;
        this.el.object3D.position.x = maxDim > 40 ? maxDim*2 : 80;
        this.el.object3D.position.y = maxDim > 40 ? maxDim*2 : 80;
        this.el.object3D.position.z = maxDim > 40 ? maxDim*2 : 80;
        // this.el.object3D.position.z = maxDim > 34 ? maxDim*1.5 : 51;
        // this.el.object3D.updateProjectionMatrix();
        // console.log(size);
    }
});
