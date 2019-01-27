/* global AFRAME */
AFRAME.registerComponent('car-audio', {
    schema: {
        sound: { type: 'string', default: 'sounds/default.mp3'},
        loop: { default: true },
    },
    init: function () {
        this.mySound = new Audio(this.data.sound);
        this.mySound.loop = this.data.loop;
        
    },
    tick: function (time, timeDelta) {
        let vel = Math.abs(this.el.getAttribute('velocity'));
        if (vel > 0.3) {
            this.mySound.play();
            this.mySound.volume = 3*vel / 100;
        } else {
            this.mySound.pause();
        }
    }
  });