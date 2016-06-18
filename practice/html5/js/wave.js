/**
 * Created by madao on 2015-09-01.
 *
 * 基于juqery的canvas。。。
 */
$.fn.sineWaves = function(option) {
	var defaults = {
		timeModifier: 1,
		amplitude: 50,
		wavelength: 50,
		segmentLength: 10,
		lineWidth: 1,
		strokeStyle: "rgba(255, 255, 255, 0.2)",
		type: "Sine"
	};

	var that = this;
	var utils = {};
	utils.isType = function(a, b) {
		var c = {}.toString.call(a).toLowerCase();
		return c === "[object " + b.toLowerCase() + "]";
	};
	utils.isFunction = function(a) {
		return this.isType(a, "function");
	};
	utils.isString = function(a) {
		return this.isType(a, "string");
	};
	utils.isNumber = function(a) {
		return this.isType(a, "number");
	};
	utils.shallowClone = function(a) {
		var b = {};
		for (var c in a){
            a.hasOwnProperty(c) && (b[c] = a[c]);
        }
		return b;
	};
	utils.defaults = function(a, b) {
		this.isType(b, "object") || (b = {});
		var c = this.shallowClone(a);
		for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
		return c;
	};
	utils.degreesToRadians = function(a) {
		if (!this.isType(a, "number")) throw new TypeError("Degrees is not a number");
		return a * Math.PI / 180;
	};
	utils.getFn = function(a, b, c) {
		return this.isFunction(b) ? b : this.isString(b) && this.isFunction(a[b.toLowerCase()]) ? a[b.toLowerCase()] : a[c];
	};
	var Ease = {};
	Ease.linear = function(a, b) {
		return b;
	};
	Ease.sinein = function(a, b) {
		return b * (Math.sin(a * Math.PI - Math.PI / 2) + 1) * .5;
	};
	Ease.sineout = function(a, b) {
		return b * (Math.sin(a * Math.PI + Math.PI / 2) + 1) * .5;
	};
	Ease.sineinout = function(a, b) {
		return b * (Math.sin(a * 2 * Math.PI - Math.PI / 2) + 1) * .5;
	};
	var Waves = {};
	Waves.sine = function(a) {
		return Math.sin(a)
	};
	Waves.sign = function(a) {
		a = +a;
		return 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1;
	};
	Waves.square = function(a) {
		return this.sign(Math.sin(a * 2 * Math.PI))
	};
	Waves.sawtooth = function(a) {
		return 2 * (a - Math.floor(a + .5))
	};
	Waves.triangle = function(a) {
		return Math.abs(this.sawtooth(a))
	};

	// 应该是一个构造函数
	function Wave() {
		if (this.options = utils.defaults(this.options, Wave), this.el = this.options.el, delete this.options.el, !this.el) throw "No Canvas Selected";
		if (this.ctx = this.el.getContext("2d"), this.waves = this.options.waves, delete this.options.waves, !this.waves || !this.waves.length) throw "No waves specified";
		this.dpr = window.devicePixelRatio || 1, this.updateDimensions(), window.addEventListener("resize", this.updateDimensions.bind(this)), this.setupUserFunctions(), this.easeFn = utils.getFn(Ease, this.options.ease, "linear"), this.rotation = utils.degreesToRadians(this.options.rotate), utils.isType(this.options.running, "boolean") && (this.running = this.options.running), this.setupWaveFns(), this.loop();
	}
	// 不知道是干啥的
	function b(a, b) {
		return utils.isType(a, "number") ? a : (a = a.toString(), a.indexOf("%") > -1 ? (a = parseFloat(a), a > 1 && (a /= 100), b * a) : a.indexOf("px") > -1 ? parseInt(a, 10) : void 0);
	}

	// 这又是干嘛的
	Function.prototype.bind || (Function.prototype.bind = function(a) {
		if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		var b = Array.prototype.slice.call(arguments, 1),
			c = this,
			d = function() {},
			e = function() {
				return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
			};
		return d.prototype = this.prototype, e.prototype = new d, e
	});
	for (var c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !window.requestAnimationFrame; ++d) {
		window.requestAnimationFrame = window[c[d] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[c[d] + "CancelAnimationFrame"] || window[c[d] + "CancelRequestAnimationFrame"];
	}
	if (!window.requestAnimationFrame) {
		var e = 0;
		window.requestAnimationFrame = function(a) {
			var b = (new Date).getTime(),
				c = Math.max(0, 16 - (b - e)),
				d = window.setTimeout(function() {
					a(b + c)
				}, c);
			return e = b + c, d
		}
	}
	window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
		clearTimeout(a)
	});

	Wave.prototype.options = $.extend({
		el: that.get(0),
		speed: 10,
		rotate: 0,
		ease: "Linear",
		wavesWidth: "95%"
	}, option);

	Wave.prototype.setupWaveFns = function() {
		for (var a = -1, b = this.waves.length; ++a < b;) {
			this.waves[a].waveFn = utils.getFn(Waves, this.waves[a].type, "sine");
		}
	};
	Wave.prototype.setupUserFunctions = function() {
		utils.isFunction(this.options.resizeEvent) && (this.options.resizeEvent.call(this), window.addEventListener("resize", this.options.resizeEvent.bind(this)));
		utils.isFunction(this.options.initialize) && this.options.initialize.call(this)
	};

	Wave.prototype.getDimension = function(a) {
		return utils.isNumber(this.options[a]) ? this.options[a] : utils.isFunction(this.options[a]) ? this.options[a].call(this, this.el) : "width" === a ? this.el.clientWidth : "height" === a ? this.el.clientHeight : void 0
	};
	Wave.prototype.updateDimensions = function() {
		var a = this.getDimension("width"),
			c = this.getDimension("height");
		this.width = this.el.width = a * this.dpr;
		this.height = this.el.height = c * this.dpr;
		this.el.style.width = a + "px";
		this.el.style.height = c + "px";
		this.waveWidth = b(this.options.wavesWidth, this.width);
		this.waveLeft = (this.width - this.waveWidth) / 2;
		this.yAxis = this.height / 2;
	};
	Wave.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	};
	Wave.prototype.time = 0;
	Wave.prototype.update = function(a) {
		this.time = this.time - .007, "undefined" == typeof a && (a = this.time);
		var b = -1,
			c = this.waves.length;
		for (this.clear(), this.ctx.save(), this.rotation > 0 && (this.ctx.translate(this.width / 2, this.height / 2), this.ctx.rotate(this.rotation), this.ctx.translate(-this.width / 2, -this.height / 2)); ++b < c;) {
			var d = this.waves[b].timeModifier || 1;
			this.drawWave(a * d, this.waves[b]);
		}
		this.ctx.restore();
		b = void 0;
		c = void 0;
	};
	Wave.prototype.getPoint = function(a, b, c) {
		var d = a * this.options.speed + (-this.yAxis + b) / c.wavelength,
			e = c.waveFn.call(this, d, Waves),
			f = this.easeFn.call(this, b / this.waveWidth, c.amplitude);
		return d = b + this.waveLeft, e = f * e + this.yAxis, {
			x: d,
			y: e
		}
	};
	Wave.prototype.drawWave = function(a, b) {
		b = utils.defaults(defaults, b), this.ctx.lineWidth = b.lineWidth * this.dpr, this.ctx.strokeStyle = b.strokeStyle, this.ctx.lineCap = "butt", this.ctx.lineJoin = "round", this.ctx.beginPath(), this.ctx.moveTo(0, this.yAxis), this.ctx.lineTo(this.waveLeft, this.yAxis);
		var c, d;
		for (c = 0; c < this.waveWidth; c += b.segmentLength) d = this.getPoint(a, c, b), this.ctx.lineTo(d.x, d.y), d = void 0;
		c = void 0, b = void 0, this.ctx.lineTo(this.width, this.yAxis), this.ctx.stroke()
	};
	Wave.prototype.running = !0;
	Wave.prototype.loop = function() {
		this.running === !0 && this.update(), window.requestAnimationFrame(this.loop.bind(this))
	};
	Wave.prototype.Waves = Waves;
	Wave.prototype.Ease = Ease;
	return new Wave();
};