function crearEscenas(Q) {

	Q.scene("myScene", function(stage) {

		Q.stageTMX("levelOK.tmx", stage);

		var player = new Q.PlayerMario( { x: 160, y: 300 } );

		stage.insert( player );

		//stage.add("viewport").follow( player, { x: true, y: false} );
		stage.add("viewport");
		stage.centerOn(150, 380);

		stage.on("destroy", function() {
			player.destroy();
		});
	});
}