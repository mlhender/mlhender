"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// ——————————————————————————————————————————————————
// TextScramble
// i——————————————————————————————————————————————————

var TextScramble = (function() {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  TextScramble.prototype.setText = function setText(newText) {
    var _this = this;

    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    var promise = new Promise(function(resolve) {
      return (_this.resolve = resolve);
    });
    this.queue = [];
    for (var i = 0; i < length; i++) {
      var from = oldText[i] || "";
      var to = newText[i] || "";
      var start = Math.floor(Math.random() * 40);
      var end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from: from, to: to, start: start, end: end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  TextScramble.prototype.update = function update() {
    var output = "";
    var complete = 0;
    for (var i = 0, n = this.queue.length; i < n; i++) {
      var _queue$i = this.queue[i];
      var from = _queue$i.from;
      var to = _queue$i.to;
      var start = _queue$i.start;
      var end = _queue$i.end;
      var char = _queue$i.char;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += '<span class="dud">' + char + "</span>";
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  TextScramble.prototype.randomChar = function randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  };

  return TextScramble;
})();

// —————————————————————————————————————————————————
// Example
// —————————————————————————————————————————————————

var el = document.querySelector(".scrambled");
var fx = new TextScramble(el);
var ot = el.innerHTML;
var nt = el.title;

var next = function next() {
  fx.setText(nt).then(function() {

  });
  el.innerHTML = nt;
  el.title = ot;
};

next();



class App {
  /**
   * @constructor
   */
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.scene = new Scene(this.width, this.height);
    this.plane = new Plane();

    this.scene.add(this.plane.mesh);

    const root = document.body.querySelector(".app");
    root.appendChild(this.scene.renderer.domElement);

    this.update = this.update.bind(this);

    this.addListeners();

    requestAnimationFrame(this.update);
  }

  /**
   * @method
   * @name onResize
   * @description Triggered when window is resized
   */
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize(this.width, this.height);
  }

  /**
   * @method
   * @name addListeners
   */
  addListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  /**
   * @method
   * @name update
   * @description Triggered on every TweenMax tick
   */
  update() {
    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    this.plane.update(this.DELTA_TIME);
    this.scene.render();

    requestAnimationFrame(this.update);
  }
}

class Plane {
  /**
   * @constructor
   */
  constructor() {
    this.size = 1000;
    this.segments = 60;

    this.options = new Options();
    this.options.initGUI();

    this.uniforms = {
      u_amplitude: { value: this.options.amplitude },
      u_frequency: { value: this.options.frequency },
      u_time: { value: 0.0 }
    };

    this.geometry = new THREE.PlaneBufferGeometry(
      this.size,
      this.size,
      this.segments,
      this.segments
    );
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById("planeVS").innerHTML,
      fragmentShader: document.getElementById("planeFS").innerHTML,
      side: THREE.DoubleSide,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = 360;
  }

  /**
   * @method
   * @name update
   * @description Triggered on every TweenMax tick
   * @param {number} dt - DELTA_TIME
   */
  update(dt) {
    this.uniforms.u_amplitude.value = this.options.amplitude;
    this.uniforms.u_frequency.value = this.options.frequency;
    this.uniforms.u_time.value += dt / 1000;
  }
}

class Scene extends THREE.Scene {
  /**
   * @constructor
   */
  constructor(width, height) {
    super();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xfffffff);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    this.camera.position.z = 100;

    //this.controls = new THREE.OrbitControls(this.camera);
  }

  /**
   * @method
   * @name render
   * @description Renders/Draw the scene
   */
  render() {
    this.renderer.autoClearColor = true;
    this.renderer.render(this, this.camera);
  }

  /**
   * @method
   * @name resize
   * @description Resize the scene according to screen size
   * @param {number} newWidth
   * @param {number} newHeight
   */
  resize(newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(newWidth, newHeight);
  }
}

class Options {
  /**
   * @constructor
   */
  constructor() {
    this.amplitude = 6.0;
    this.frequency = 0.005;
  }

  initGUI() {}
}

new App();



window.onload = function() {
  setTimeout(function() {
    $(".ui-container").addClass("active");
  }, 2000);
};
