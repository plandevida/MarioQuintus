/*
window.addEventListener("load", function() {

	setupEngine();
});

function setupEngine() {
	*/
	var Q = Quintus({ development: true, maximize: true })
								.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
								.setup({ width: 320, height:480 })
								.controls();

	Q.Sprite.extend("PlayerMario", {
		init: function(p) {
			this._super(p, {
				assert: "pincess.png"
			});

			this.add("2d", "plataformerControls");
		}
	});

	Q.scene("level", function(stage) {

		Q.stageTMX('levelOK.tmx', stage);

		var player = new Q.PlayerMario();
		stage.insert(player);
		stage.add("viewport").follow(player,{ x: true, y: false });
		stage.centerOn(150, 380);
	});

	Q.loadTMX( "princess.png, levelOK.tmx", function(stage) {
		Q.stageScene("level");
	});
//};
