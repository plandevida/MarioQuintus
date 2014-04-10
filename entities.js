function crearEntidades(Q) {

	Q.Sprite.extend("PlayerMario", {
		init: function(p) {
			this._super(p, {
				assert: "pincess.png"
			});

			this.add("2d", "plataformerControls");
		}
	});
}

function crearComponenres(Q) {

	Q.component("florFuego", {
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