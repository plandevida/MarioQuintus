function crearEntidades(Q) {

	Q.Sprite.extend("PlayerMario", {
		init: function(p) {
			this._super(p, {
				sprite: "marioR",
				sheet: "playerMaro",
				frame: 0,
				jumpSpeed: -350 
			});

			this.add('2d, platformerControls, florFuego');
			this.add("animations");

			Q.input.on("left", this, "left");
			Q.input.on("right", this, "right");
		},

		left: function(dt) {
			if(this.p.direction == 'right') {
                this.p.flip = 'x';
            }
		},

		right: function(dt) {
			if(this.p.direction == 'left') {
                this.p.flip = false;
            }
		}
	});

	Q.animations("playerMario", {
		run_right: { frames: [1,2,3,4], rate: 1/15},
		run_left: { frames: [15,16,17,18], rate: 1/15},
		stand_right: { frames: [1], rate: 1/5},
		stand_left: { frames: [15], rate: 1/5},
		fall_right: { frames: [13], loop: false},
		fall_left: { frames: [27], loop: false}
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