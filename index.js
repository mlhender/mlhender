
$( document ).ready(function() {
    $(".background").addClass("active");
});

  $(".button-container").click(function() {
    $(".button-container").toggleClass("open");
    $(".menu").toggleClass("open");
  });





  // Main Application
  class Application {
    constructor(container) {
      this.images = [
      'https://i.imgur.com/fS4Ggpt.jpg'];

      this.speed = 0;
      this.s = 150;
      this.container = document.querySelector(container);
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;

      this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, {
        transparent: true,
        antialias: true });

      this.renderer.autoResize = true;
    }
    init() {
      this.count = 0;
      this.imageURL = this.images[this.count];
      this.dispURL = 'https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png';
      this.container.appendChild(this.renderer.view);
      this.stage = new PIXI.Container();

      this.texture = PIXI.Texture.fromImage(this.imageURL);
      this.sprite = new PIXI.Sprite(this.texture);
      this.sprite.scale.set(.5, .5);
      this.sprite.anchor.set(0.0, 0.0);

      this.displacementSprite = PIXI.Sprite.fromImage(this.dispURL);
      this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;

      this.stage.addChild(this.sprite);
      this.stage.addChild(this.displacementSprite);
      setInterval(() => {
        this.count++;

        if (this.count > this.images.length - 1) {
          this.count = 0;
        }

        console.log(this.count);

      }, 500);
      this.container.addEventListener('mouseenter', e => this.animateContainer(e));
      this.animate();
    }
    animate() {
      requestAnimationFrame(() => this.animate());
      this.speed += 1;
      this.imageURL = this.images[this.count];

      this.stage.filters = [this.displacementFilter];
      this.renderer.render(this.stage);

      TweenMax.to(this.displacementFilter.scale, 1, {
        x: this.s });



      this.displacementSprite.x = this.speed;
      this.displacementSprite.y = this.speed;


    }
    animateContainer(e) {
      TweenMax.to(this.displacementFilter.scale, 1, {
        x: 0 });

    }}

  window.onload = () => {

    let app = new Application('.background');
    app.init();
    let image = document.querySelector('.background');

    let int = new Interact(image, 0.1);
    int.initEvents();



    const datv = new dat.GUI();
    datv.add(int, 'skew', 0, 0.1);

  };


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
      this.chars = "!@#$%&{}????";
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
