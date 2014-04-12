window.addEventListener("load", function() {

	// Configura Quintus y el juego
	setupGame();
});

function setupGame() {
	var Q = Quintus().include("Sprites, Scenes, Input, UI, Touch, TMX, Anim, 2D")
					.setup({ development: true, maximize: true })
					.controls();

	// Crea todos los elementos del juego.
	crearEntidades(Q);

	// Crea todas las escenas del juego.
	crearEscenas(Q);

	// Carga la escena inicial del
	Q.loadTMX( "mario_small.png, mario_small.json, levelOK.tmx", function(stage) {
		Q.compileSheets(["mario_small.png", "mario_small.json"]);
		Q.stageScene("myScene");
	});
};
