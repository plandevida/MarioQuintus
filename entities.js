function crearEntidades(Q) {

	Q.Sprite.extend("PlayerMario", {
		init: function(p) {
			this._super(p, {
				sprite: "playerMario",
				sheet: "marioR",
				frame: 0,
				jumpSpeed: -525,
				// Un cuadrado de bounding box algo más pequeño
				points: [ [-13, -16], [13, -16], [13, 16], [-13, 16]]
			});

			this.add('2d, platformerControls, animation');

			// Componentes propios
			this.add('florFuego');

			Q.input.on("left", this, "left");
			Q.input.on("right", this, "right");
			Q.input.on("up", this, "jump");
		},

		left: function(dt) {
			/*if(this.p.direction == 'right') {
                this.p.flip = 'x';
            }*/
            this.play("run_left");
		},

		right: function(dt) {
			/*if(this.p.direction == 'left') {
                this.p.flip = false;
            }*/
            this.play("run_right");
		},

		jump: function(dt) {
			if ( this.p.direction == 'right') {
				this.play("jump_right");
			}
			else {
				this.play("jump_left");
			}
		}
	});

	Q.Sprite.extend("Champi", {
		init: function(p) {
			this._super(p, {
				sprite: "champi",
				sheet: "goomba",
				frame: 0,
				vx: -60
			});

			this.add('2d, animation');
			this.play("run_left");
		}
	});

	Q.animations("playerMario", {
		run_right: { frames: [1,2,3], rate: 1/15, loop: true, next: "stand_right" },
		run_left: { frames: [15,16,17], rate: 1/15, loop: true, next: "stand_left" },
		stand_right: { frames: [0], rate: 1/5 },
		stand_left: { frames: [14], rate: 1/5 },
		jump_right: { frames: [4], loop: false, next: "stand_right" },
		jump_left: { frames: [18], loop: false, next: "stand_left" },
		fall_right: { frames: [13], loop: false },
		fall_left: { frames: [27], loop: false }
	});

	Q.animations("champi", {
		run_left: { frames: [0,1], rate: 1/5 },
		die: { frames: [2], loop: false }
	});
}

function crearComponenres(Q) {

	Q.component("florFuego", {
		added: function() {
			this.entity.p.tipoMunicion = "bolaFuego";
			Q.input.on("fire", this.entity, "fireball");
		},

		extend: {
			fireball: function() {
				console.log("disparando bolas de fuego");
			}
		}
	});
}