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

		var player = stage.insert( new Q.PlayerMario( { x: 16, y: 530 } ) );

		var princesa = stage.insert( new Q.Princesa( { x: 215*32, y: 4*32 } ));

		var champi = stage.insert( new Q.Champi( { x: 28*32, y: 530 } ));

		var bloopa = stage.insert( new Q.Bloopa( { x: 31*32, y: 466 } ));


		var bola = stage.insert( new Q.Localizer( { x: 25*32+8, y: 435, w:20, h:20} ) );
		var caja = stage.locate(25*32+8, 435);

		confugurarCajasSorpresa(caja);

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
			stage.insert(new Q.Repeater( { asset: "bg.png" } ));
		}

		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));

		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: stage.options.button, keyActionName: "confirm" }));
		var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

		button.on("click",function() {
			Q.clearStages();
			Q.stageScene('level1-1');
		});

		container.fit(20);
	});

	Q.scene("HUD", function(stage) {
		Q.state.set( {score: 0, lives: 3} );

	});
}