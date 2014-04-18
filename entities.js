function crearEntidades(Q) {

	Q.Sprite.extend("PlayerMario", {
		init: function(p) {
			this._super(p, {
				sprite: "playerMario_anim",
				sheet: "marioR",
				frame: 0,
				jumpSpeed: -525,
				// Un cuadrado de bounding box algo más pequeño
				points: [ [-13, -16], [13, -16], [13, 14], [-13, 14]]
			});

			this.add('2d, platformerControls, animation');

			// Componentes propios
			this.add('florFuego');

			Q.input.on("left", this, "left");
			Q.input.on("right", this, "right");
			Q.input.on("up", this, "jump");
			this.on("jumped_right", this, "jumped");
			this.on("jumped_left", this, "jumped");
		},

		left: function(dt) {
            this.play("run_left");
		},

		right: function(dt) {
            this.play("run_right");
		},

		jump: function(dt) {
			if ( this.p.direction == 'right') {
				this.play("jump_right");
			}
			else {
				this.play("jump_left");
			}
		},

		jumped: function() {
			if ( this.p.direction == 'left' ) {

				if ( Q.inputs['left'] == true ) {
					this.play("run_left");
				}
				else {
					this.play("stand_left");
				}
			}
			else if ( this.p.direction == 'right' ) {

				if ( Q.inputs['right'] == true ) {
					this.play("run_right");
				}
				else {
					this.play("stand_right");
				}
			}
		},

		step: function(dt) {

			// si mario se cae vuelve a la posición inicial
			if ( this.p.y >= Q.height + 140 ) {
				this.die();
			}
			if ( this.p.x <= 16 ) {
				this.p.x = 16;
			}
		},

		hit: function(damage) {
			this.del('platformerControls');
			Q.input.off('up');
			Q.input.off('left');
			Q.input.off('right');
			
			this.p.collisionMask = Q.SPRITE_NONE;
			this.p.vy = -300;

			if ( this.p.direction == 'right' ) {
				this.play("fall_right");

			}
			else if (this.p.direction == 'left') {
				this.play("fall_left");
			}
		},

		die: function() {
			Q.stage(0).pause();
			Q.stageScene("UI", 1, { label: "Has muerto", button: "Volver a empezar", bg: false } );
		}
	});

	Q.Sprite.extend("Princesa", {
		init: function(p) {
			this._super(p, {
				asset: "princess.png"
			});

			this.add('2d');

			this.on("hit");
		},

		hit: function(col) {
			if ( col.obj.isA("PlayerMario") ) {
				Q.stage().pause();
				Q.stageScene("UI", 1, { label: "Has ganado", button: "Volver a empezar", bg: false } );
			}
		}
	});

	Q.Sprite.extend("Champi", {
		init: function(p) {
			this._super(p, {
				sprite: "champi_anim",
				sheet: "goomba",
				frame: 0,
				vx: -60,
				type: Q.SPRITE_ENEMY,
				reducedPoints: [ [-16, -2], [16, -2], [16, 16], [-16, 16] ]
			});

			this.add('2d, animation, aiBounce, defaultEnemy');

			this.play("run_left");
		}
	});

	Q.Sprite.extend("Bloopa", {
		init: function(p) {
			this._super(p, {
				sprite: "bloopa_anim",
				sheet: "bloopa",
				frame: 0,
				jumpSpeed: -200,
				vy: -150,
				gravity: 0.15,
				type: Q.SPRITE_ENEMY,
				points: [ [-16, -24], [16, -24], [16, 18], [-16, 18] ],
				reducedPoints: [ [-16, -16], [16, -16], [16, 16], [-16, 16] ]
			});

			this.add('2d, animation, defaultEnemy');

			this.play("jump");
		},

		step: function(dt) {

			if ( this.p.vy == 0 && !this.p.colisionado ) {
				this.p.vy = -150;
				this.play("jump");
			}
		}
	});

	Q.animations("playerMario_anim", {
		run_right: { frames: [1,2,3], rate: 1/10, next: "stand_right" },
		run_left: { frames: [15,16,17], rate: 1/10, next: "stand_left" },
		stand_right: { frames: [0], rate: 1/3, loop: false },
		stand_left: { frames: [14], rate: 1/3, loop: false },
		jump_right: { frames: [4], rate: 1/3, loop: false, trigger: "jumped_right" },
		jump_left: { frames: [18], loop: false, trigger: "jumped_left" },
		fall_right: { frames: [12], loop: false },
		fall_left: { frames: [26], loop: false },
		bandera_right: { frames: [7], loop: false },
		bandera_left: { frames: [21], loop: false }
	});

	Q.animations("champi_anim", {
		run_left: { frames: [0,1], rate: 1/5 },
		aplastado: { frames: [2], rate: 1/3, loop: false, trigger: "hit_enemy" },
		die: { frames: [3], rate: 1/3, loop: false }
	});

	Q.animations("bloopa_anim", {	
		jump: { frames: [1, 0], rate: 1/5, loop: false },
		aplastado: { frames: [1, 2], rate: 1/3, loop: false, trigger: "hit_enemy" },
		die: { frames: [2], rate: 1/3, loop: false }
	});

	Q.Sprite.extend("Localizer", {
		init: function(p) {
			this._super(p, {
				gravity: 0,
				type: Q.SPRITE_NONE,
				collisionMask: Q.SPRITE_NONE
			});
		},

		draw: function(ctx) {
			ctx.fillStyle = "red";
	      ctx.beginPath();
	      ctx.arc(-this.p.cx,
              -this.p.cy,
              this.p.w/2,0,Math.PI*2); 
      		ctx.fill();
		}
	});
}

function confugurarCajasSorpresa(caja) {
	caja.add('2d');
	/*caja.p.sprite = '';
	caja.p.sheet = ;
	*/
}

function crearComponentes(Q) {

	Q.component("defaultEnemy", {
		added: function() {
			this.entity.on("bump.top", this, "bumpTop");
			this.entity.on("bump.bottom, bump.left, bump.right", this, "colisiones");
			this.entity.on("step", this, "stepc");
			this.entity.on("hit_enemy", this, "hitEnemy");
		},

		bumpTop: function(col) {

			if ( col.obj.isA("PlayerMario") ) {
				this.entity.play("aplastado");
				col.obj.p.vy = -300;
				this.entity.p.colisionado = true;
				this.entity.p.points = this.entity.p.reducedPoints;
			}
		},

		colisiones: function(col) {

			if ( col.obj.isA("PlayerMario") ) {
				col.obj.hit();
			}
		},

		hitEnemy: function() {
			this.entity.p.collisionMask = Q.SPRITE_NONE;
			this.entity.p.vy = -200;
			this.entity.p.gravity = 1;
			this.entity.play("die");
		},

		die: function(damage) {
			this.entity.destroy();
		},

		stepc: function(dt) {
			if ( this.entity.p.y >= Q.height + 140) {
				this.die();
			}
		}
	});

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