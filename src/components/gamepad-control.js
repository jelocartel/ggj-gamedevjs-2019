/* global AFRAME, THREE */
var GamepadButton = Object.assign(function GamepadButton () {}, {
	FACE_1: 0,
	FACE_2: 1,
	FACE_3: 2,
	FACE_4: 3,

	L_SHOULDER_1: 4,
	R_SHOULDER_1: 5,
	L_SHOULDER_2: 6,
	R_SHOULDER_2: 7,

	SELECT: 8,
	START: 9,

	DPAD_UP: 12,
	DPAD_DOWN: 13,
	DPAD_LEFT: 14,
	DPAD_RIGHT: 15,

	VENDOR: 16,
});
function GamepadButtonEvent (type, index, details) {
    this.type = type;
    this.index = index;
    this.pressed = details.pressed;
    this.value = details.value;
  }

var MAX_DELTA = 200, // ms
    PI_2 = Math.PI / 2;

var JOYSTICK_EPS = 0.2;

module.exports = {

  /*******************************************************************
   * Statics
   */

  GamepadButton: GamepadButton,

  /*******************************************************************
   * Schema
   */

  schema: {
    // Controller 0-3
    controller:        { default: 0, oneOf: [0, 1, 2, 3] },

    // Enable/disable features
    enabled:           { default: true },
    movementEnabled:   { default: true },
    lookEnabled:       { default: true },
    flyEnabled:        { default: false },
    invertAxisY:       { default: false },
    turnSpeed: {default: Math.PI / 4},

    // Constants
    easing:            { default: 20 },
    acceleration:      { default: 65 },
    sensitivity:       { default: 0.04 },

    // Control axes
    pitchAxis:         { default: 'x', oneOf: [ 'x', 'y', 'z' ] },
    yawAxis:           { default: 'y', oneOf: [ 'x', 'y', 'z' ] },
    rollAxis:          { default: 'z', oneOf: [ 'x', 'y', 'z' ] },
  },

  /*******************************************************************
   * Core
   */

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.position = {};
    this.velocity = new THREE.Vector3();

    // Button state
    this.buttons = {};

    if (!this.getGamepad()) {
      console.warn(
        'Gamepad #%d not found. Connect controller and press any button to continue.',
        this.data.controller
      );
    }
  },

  /**
   * Called on each iteration of main render loop.
   */
  tick: function (time, delta) {
    this.updatePosition(delta);
    this.updateButtonState();
  },

  /*******************************************************************
   * Movement
   */

  updatePosition: function (dt) {
    var data = this.data;
    var acceleration = data.acceleration;
    var easing = data.easing;
    var velocity = this.velocity;
    var rollAxis = data.rollAxis;
    var pitchAxis = data.pitchAxis;
    var el = this.el;
    var gamepad = this.getGamepad();

    // If data has changed or FPS is too low
    // we reset the velocity
    if (dt > MAX_DELTA) {
      velocity[rollAxis] = 0;
      velocity[pitchAxis] = 0;
      return;
    }

    velocity[rollAxis] -= velocity[rollAxis] * easing * dt / 1000;
    velocity[pitchAxis] -= velocity[pitchAxis] * easing * dt / 1000;

    var position = el.getAttribute('position');

    if (data.enabled && data.movementEnabled && gamepad) {
      var dpad = this.getDpad(),
          inputX = dpad.x || this.getJoystick(0).x,
          inputY = dpad.y || this.getJoystick(0).y,
          pad = this.getGamepad(),
          b7 = pad.buttons[7].pressed || 0,
          b6 = pad.buttons[6].pressed || 0;
      if (Math.abs(inputX) > JOYSTICK_EPS) {
        // velocity[pitchAxis] += inputX * acceleration * dt / 1000;
        let sign = b6 > b7 ? -1 : 1;
        let maxVelocity = data.acceleration / data.easing;
        // Scale velocity linearly to [0,1]. The slower the object moves, the
        // slower it will turn.
        let velFactor = Math.abs(velocity[rollAxis] / maxVelocity);
            this.el.object3D.rotation.y -= sign * inputX * velFactor * data.turnSpeed * dt/1000;
      }
    //   if (Math.abs(inputY) > JOYSTICK_EPS) {
    //     velocity[rollAxis] += inputY * acceleration * dt / 1000;
    //   }
      if(b7) {
        velocity[rollAxis] -= b7 * acceleration * dt/100;
      }
      if(b6) {
        velocity[rollAxis] += b6 * acceleration * dt/100;
      }
    }

    var movementVector = this.getMovementVector(dt);

    var currentPosition = el.getAttribute('position');
    position.x = currentPosition.x + movementVector.x;
    position.y = currentPosition.y + movementVector.y;
    position.z = currentPosition.z + movementVector.z;
    el.setAttribute('position', position);
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;
      var xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta / 1000);

      // Absolute.
      if (!rotation) { return directionVector; }

      xRotation = this.data.fly ? rotation.x : 0;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    }
    })(),


  /*******************************************************************
   * Button events
   */

  updateButtonState: function () {
    var gamepad = this.getGamepad();
    if (this.data.enabled && gamepad) {

      // Fire DOM events for button state changes.
      for (var i = 0; i < gamepad.buttons.length; i++) {
        if (gamepad.buttons[i].pressed && !this.buttons[i]) {
          this.emit(new GamepadButtonEvent('gamepadbuttondown', i, gamepad.buttons[i]));
        } else if (!gamepad.buttons[i].pressed && this.buttons[i]) {
          this.emit(new GamepadButtonEvent('gamepadbuttonup', i, gamepad.buttons[i]));
        }
        this.buttons[i] = gamepad.buttons[i].pressed;
      }

    } else if (Object.keys(this.buttons)) {
      // Reset state if controls are disabled or controller is lost.
      this.buttons = {};
    }
  },

  emit: function (event) {
    // Emit original event.
    this.el.emit(event.type, event);

    // Emit convenience event, identifying button index.
    this.el.emit(
      event.type + ':' + event.index,
      new GamepadButtonEvent(event.type, event.index, event)
    );
  },

  /*******************************************************************
   * Gamepad state
   */

  /**
   * Returns the Gamepad instance attached to the component. If connected,
   * a proxy-controls component may provide access to Gamepad input from a
   * remote device.
   *
   * @return {Gamepad}
   */
  getGamepad: function () {
    var localGamepad = navigator.getGamepads
          && navigator.getGamepads()[this.data.controller],
        proxyControls = this.el.sceneEl.components['proxy-controls'],
        proxyGamepad = proxyControls && proxyControls.isConnected()
          && proxyControls.getGamepad(this.data.controller);
    return proxyGamepad || localGamepad;
  },

  /**
   * Returns the state of the given button.
   * @param  {number} index The button (0-N) for which to find state.
   * @return {GamepadButton}
   */
  getButton: function (index) {
    return this.getGamepad().buttons[index];
  },

  /**
   * Returns state of the given axis. Axes are labelled 0-N, where 0-1 will
   * represent X/Y on the first joystick, and 2-3 X/Y on the second.
   * @param  {number} index The axis (0-N) for which to find state.
   * @return {number} On the interval [-1,1].
   */
  getAxis: function (index) {
    return this.getGamepad().axes[index];
  },

  /**
   * Returns the state of the given joystick (0 or 1) as a THREE.Vector2.
   * @param  {number} id The joystick (0, 1) for which to find state.
   * @return {THREE.Vector2}
   */
  getJoystick: function (index) {
    var gamepad = this.getGamepad();
    switch (index) {
      case 0: return new THREE.Vector2(gamepad.axes[0], gamepad.axes[1]);
      case 1: return new THREE.Vector2(gamepad.axes[2], gamepad.axes[3]);
      default: throw new Error('Unexpected joystick index "%d".', index);
    }
  },

  /**
   * Returns the state of the dpad as a THREE.Vector2.
   * @return {THREE.Vector2}
   */
  getDpad: function () {
    var gamepad = this.getGamepad();
    if (!gamepad.buttons[GamepadButton.DPAD_RIGHT]) {
      return new THREE.Vector2();
    }
    return new THREE.Vector2(
      (gamepad.buttons[GamepadButton.DPAD_RIGHT].pressed ? 1 : 0)
      + (gamepad.buttons[GamepadButton.DPAD_LEFT].pressed ? -1 : 0),
      (gamepad.buttons[GamepadButton.DPAD_UP].pressed ? -1 : 0)
      + (gamepad.buttons[GamepadButton.DPAD_DOWN].pressed ? 1 : 0)
    );
  },

  /**
   * Returns true if the gamepad is currently connected to the system.
   * @return {boolean}
   */
  isConnected: function () {
    var gamepad = this.getGamepad();
    return !!(gamepad && gamepad.connected);
  },

  /**
   * Returns a string containing some information about the controller. Result
   * may vary across browsers, for a given controller.
   * @return {string}
   */
  getID: function () {
    return this.getGamepad().id;
  }
};
