function crearEntidades(quintusGameEngine) {

	quintusGameEngine.Sprite.extend("playerMario", {
		init: function() {
			this.add("2d", "plataformerControls");
		}
	});
}

function crearComponenres(quintusGameEngine) {

	quintusGameEngine.component("florFuego", {
		added: function() {
			this.entity.p.tipoMunicion = "bloaFuego";
		},

		extend: {
			fire: function() {
				console.log("disparando bolas de fuego");
			}
		}
	});
}