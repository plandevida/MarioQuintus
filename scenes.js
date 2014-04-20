function crearEscenas(Q) {

	Q.scene("myScene", function(stage) {

		Q.stageTMX("levelOK.tmx", stage);

		var player = new Q.PlayerMario( { x: 16, y: 600 } );

		stage.insert( player );

		stage.add("viewport").follow( player, { x: true, y: false} );
		stage.centerOn(150, 380);

		stage.on("destroy", function() {
			player.destroy();
		});
	});

	Q.scene("level1-1", function(stage) {
		Q.stageTMX("level1-1.tmx", stage);

		var player = stage.insert( new Q.PlayerMario( { x: 34, y: 520 } ) );
		//var player = stage.insert( new Q.PlayerMario( { x: 200*34+16, y: 520 } ) );
		stage.insert( new Q.Princesa( { x: 202*34+16, y: 12*34 } ));
		stage.insert( new Q.Champi( { x: 26*34+12, y: 530 } ));

		stage.insert( new Q.Champi( { x: 44*34, y: 15*34 } ));

		stage.insert( new Q.Champi( { x: 52*34, y: 15*34 } ));
		stage.insert( new Q.Champi( { x: 53*34+16, y: 15*34 } ));

		stage.insert( new Q.Champi( { x: 88*34, y: 15*34 } ));
		stage.insert( new Q.Champi( { x: 87*34+16, y: 15*34 } ));

		stage.insert( new Q.Bloopa( { x: 31*32, y: 466 } ));

		stage.insert( new Q.Bloopa( { x: 139*34, y: 15*34, vy: -250, vyrestore: -250 } ));

		stage.insert( new Q.Champi( { x: 128*34, y: 15*34 } ));
		stage.insert( new Q.Champi( { x: 129*34+16, y: 15*34 } ));
		stage.insert( new Q.Champi( { x: 131*34, y: 15*34 } ));
		stage.insert( new Q.Champi( { x: 132*34+16, y: 15*34 } ));

		stage.insert( new Q.Champi( { x: 180*34, y: 13*34 } ));
		stage.insert( new Q.Champi( { x: 181*34+16, y: 13*34 } ));

		stage.insert( new Q.Coin( { x:19*34+16, y: 12*34+16 } ) );

		//var caja = stage.locate(22*34+16, 435);
		//var moneda = stage.locate(19*34+16, 435);

		//configuraCajasSorpresa(Q, caja);
		//configuraMoneda(Q, moneda);

		stage.add("viewport").follow( player, { x: true, y: false}, { minX: 0, minY: 0, maxX: 224*32, maxY: 480} );
		//stage.viewport.offsetX = -Q.width/2+32;
		stage.viewport.offsetX = -Q.width/4;
		stage.centerOn(16, 360);

		stage.on("destroy", function() {
			player.destroy();
		});
	});

	Q.scene('level1-2', function(stage) {
		Q.stageTMX("level1-2.tmx", stage);

		var player = stage.insert( new Q.PlayerMario( { x: 16, y: 530 } ) );

		stage.add("viewport").follow( player, { x: true, y: false}, { minX: 0, minY: 0, maxX: 224*32, maxY: 480} );
		stage.viewport.offsetX = -Q.width/2+32;

		stage.viewport.offsetX = -Q.width/4;
		stage.centerOn(16, 360);

		stage.on("destroy", function() {
			player.destroy();
		});
	});

	Q.scene('UI',function(stage) {

		if ( stage.options.bg === true ) {
			stage.insert(new Q.Repeater( { asset: "mainTitle.png" } ));
		}

		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));

		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: stage.options.button, keyActionName: "confirm" }));
		var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

		button.on("click",function() {
			Q.clearStages();
			Q.stageScene('level1-1');
			Q.stageScene('HUD', 1);
			if ( musicMainPlaying == false ) {
				Q.audio.stop();
				Q.audio.play('music_main.ogg', { loop: true });
			}
		});

		container.fit(20);

		var musicMainPlaying = false;
		Q.audio.stop('music_main.ogg');
		if ( stage.options.music == true ) {
			musicMainPlaying = true;
			Q.audio.play('music_main.ogg', {loop: true});
		}
	});

	Q.scene("HUD", function(stage) {

		Q.state.set( { score: 0, lives: 3 } );

		Q.UI.Text.extend("Score", {
			init: function(p) {
				this._super(p, {
					label: 'score: 0',
					x: 70,
					y: 20
				});

				Q.state.on("change.score", this, "score");
			},

			score: function(score) {
				this.p.label = "score: " + score;
			}

		});

		stage.insert( new Q.Score() );
	});
}