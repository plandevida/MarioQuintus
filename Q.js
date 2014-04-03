window.addEventListener("load", function() {
	console.log("Iniciendo quintus");

	setupEngine();
});

function setupEngine() {
	var quintusGameEngine = Quintus({ development: true, maximize: true })
								.include("Sprites, Input, UI, Touch, TMX, Anim")
								.setup({ width: 320, height:480 });

/*quintusGameEngine.loadTMX("levelOK.tmx", function() {
	quintusGameEngine.stageTMX("levelOK.tmx", stage);
});*/

crearEntidades(quintusGameEngine);

	quintusGameEngine.MovingSprite.extend("Ball", {
		draw: function(ctx) {
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(-this.p.cx, -this.p.cy, this.p.w/2, 0, Math.PI*2);
			ctx.fill();
		}
	});

	var ball = new quintusGameEngine.Ball( { w: 20, h: 20, x: 30, y: 300, vx: 30, vy: -100, ax: 0, ay: 30 });

	quintusGameEngine.gameLoop( function(dt) {
		quintusGameEngine.clear();
		ball.update(dt);
		ball.render(quintusGameEngine.ctx);
	});
};
