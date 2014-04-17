window.addEventListener("load", function() {

	// Configura Quintus y el juego
	setupGame();
});

function setupGame() {
	var Q = Quintus( { development: true } ).include("Sprites, Scenes, Input, UI, Touch, TMX, Anim, 2D")
					.setup( { maximize: true, height: 480 } )
					.controls()
					.touch();

	//Q.debug = true;

	// Crea todos los elementos del juego.
	crearEntidades(Q);

	// Crea todas las escenas del juego.
	crearEscenas(Q);

	// Carga la escena inicial del
	Q.loadTMX( "mario_small.png, mario_small.json, goomba.png, goomba.json, levelOK.tmx, level1-1.tmx, levelv2.tmx", function(stage) {
		Q.compileSheets("mario_small.png", "mario_small.json");
		Q.compileSheets("goomba.png", "goomba.json");
		Q.stageScene("level1-1");
	});
};
