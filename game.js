window.addListener("load", function() {

	var quintusGameEngine = window.Q = Quitus({ development: true, maximize: true }).include("Sprites, Scenes, Input, UI, Touch").setup({ width: 320, height:480 });

	quintusGameEngine.MovingSprite.extend("Ball" {
		draw: function(ctx) {
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(-this.p.cx, -this.p.cy, this.p.w/2, 0, Math.Pi*2);
			ctx.fill();
		}
	});

	var ball = window.ball = new Q.Ball({ w:20, h:20, x:30, y:300, vx:40, vy: -100, ax: 0, ay:30});

		quintusGameEngine.gameLoop(function(dt) {
		quintusGameEngine.clear();
		ball.update(dt);
		ball.render(quintusGameEngine.ctx);
	});
});
