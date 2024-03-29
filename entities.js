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

			this.add('2d, platformerControls, animation, tween');

			// Componentes propios
			this.add('florFuego');

			//Q.input.on("left", this, "left");
			//Q.input.on("right", this, "right");
			//Q.input.on("up", this, "jump");
			//this.on("jumped_right", this, "jumped");
			//this.on("jumped_left", this, "jumped");
		},
/*
		left: function(dt) {
            this.play("run_left");
		},

		right: function(dt) {
            this.play("run_right");
		},

		jump: function(dt) {
			this.play("jump_" + this.p.direction );
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
*/
		step: function(dt) {

			//console.log("x: " + this.p.x + " y: " + this.p.y);

			if ( ! this.p.death ) {
				if ( Q.inputs['up'] ) {
					this.play('jump_' + this.p.direction );
				}
				else if ( Q.inputs['right'] ) {
					this.play('run_right');
				}
				else if ( Q.inputs['left'] ) {
					this.play('run_left');
				}
				else {
					this.play('stand_' + this.p.direction);
				}
			}

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

			this.p.death = true;
			
			this.p.type = Q.SPRITE_NONE;
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
			Q.stage().pause();
			Q.stageScene("UI", 2, { label: "Has muerto", button: "Volver a empezar", bg: false, music: false } );
			Q.audio.play("music_die.ogg");
		},

		mariowin: function(from) {

			this.animate( { x: 200*34, y: 10*34, angle: 360 }, 2, Q.Easing.Quadratic.Out, { callback: function(){ this.win(); }} );
		},

		win: function() {
			this.play("jump");
			this.p.scale = 3;
			Q.stage().pause();
			Q.stageScene("UI", 2, { label: "Has ganado", button: "Volver a empezar", bg: false, music: false } );
			Q.audio.play("music_level_complete.ogg");
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
				col.obj.mariowin();
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
				vyrestore: -150,
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
				this.p.vy = this.p.vyrestore;
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

	Q.animations("coin", {
		coin: { frames: [2,1,0], rate:1/5 }
	});

	Q.animations("magicbox", {
		box: { frames: [0, 1, 2], rate: 1/2 },
		die: { frames: [3], loop: false }
	});

	Q.Sprite.extend("Coin", {
		init: function(p) {
			this._super(p, {
				puntos: 50,
				sheet: "coin",
				sprite: "coin",
				gravity: 0,
				frame: 2,
				type: Q.SPRITE_POWERUP
			});

			this.add("2d, animation, tween");

			this.on("hit", this, "colisiones");

			this.play('coin');
		},

		colisiones: function(col) {
			if ( col.obj.isA("PlayerMario") ) {
				this.p.collisionMask = Q.SPRITE_NONE;
				Q.state.inc("score", this.p.puntos);
				Q.audio.play("coin.ogg");
				this.anim();
			}
		},

		die: function() {
			this.destroy();
		},

		anim: function() {
			this.animate( { x: this.p.x, y: ((this.p.y/34)-2)*34 }, 1/4, Q.Easing.Linear, { callback: function(){this.die();}} );
		}
	});

	Q.Sprite.extend("MagicBox", {
		init: function(p) {
			this._super(p, {
				puntos: 60,
				sheet: "magicbox",
				sprite: "magicbox",
				gravity: 0,
				frame: 0,
				coins: 5,
				type: Q.SPRITE_POWERUP
			});

			this.add("2d, animation, tween");

			this.on("bump.bottom", this, "colisiones");

			this.play("box");

			this.p.yy = this.p.y - 17;
		},

		colisiones: function(col) {
			if ( col.obj.isA("PlayerMario")) {
				if ( this.p.coins > 0) {
					Q.state.inc("score", this.p.puntos);
					Q.audio.play("coin.ogg");

					this.animate( { x: this.p.x, y: ((this.p.y/34)-1/2)*34 }, 1/6, Q.Easing.Linear, { callback: function() {

						var coin = Q.stage().insert(new Q.Coin({ x: this.p.x, y:this.p.y }) );

						coin.anim();

						this.animate( { x: this.p.x, y: this.p.yy }, 1/6, Q.Easing.Linear, { callback: function(){
							this.die();
							this.p.y = this.p.yy;
						} } );
					}} );
				}
				else {
					this.p.y = this.p.yy;
				}
			}
		},

		die: function() {
			this.p.coins--;

			if ( this.p.coins == 0) {
				this.play("die");
			}
		}
	});
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
