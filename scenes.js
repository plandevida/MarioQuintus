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

		var player = new Q.PlayerMario( { x: 16, y: 360 } );

		stage.insert( player );

		var champi = new Q.Champi( { x: 28*32, y: 360 } );

		stage.insert( champi );

		var cameraControl = new Q.CameraController( { escenario: stage } );

		stage.insert( cameraControl );

		stage.add("viewport").follow( player, { x: true, y: false} );
		stage.viewport.offsetX = -Q.width/2+32;
		stage.centerOn(16, 360);

		stage.on("destroy", function() {
			player.destroy();
		});
	});

	Q.scene("levelv2", function(stage) {
		Q.stageTMX("levelv2.tmx", stage);

		var player = new Q.PlayerMario( { x: 16, y: 360 } );

		stage.insert( player );

		var champi = new Q.Champi( { x: 28*32, y: 360 } );

		stage.insert( champi );

		stage.add("viewport").follow( player, { x: true, y: false} );
		stage.viewport.offsetX = -Q.width/2+32;
		stage.centerOn(16, 360);

		stage.on("destroy", function() {
			player.destroy();
		});
	});
}