// START OF THE MAIN SCREEN
var startScreen;

function beginLoop() {
    var frameId = 0;
    var lastFrame = Date.now();

    function loop() {
        var thisFrame = Date.now();
        var elapsed = thisFrame - lastFrame;
        frameId = window.requestAnimationFrame(loop);
        startScreen.update(elapsed);
        startScreen.draw(g_ctx);
        lastFrame = thisFrame;
    }
    loop();
}

startScreen = (function (input) {
    var hue = 0;
    var direction = 1;
    var transitioning = false;
    var wasButtonDown = false;
    var title = 'TRON';

    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }

    function draw(ctx, elapsed) {
        var y = ctx.canvas.height / 2;
        var color = 'rgb(0,' + hue + ',0)';

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#39FF14';
        ctx.font = '48px monospace';
        centerText(ctx, title, y);

        ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'click to begin', y + 30);
    }

    function update() {
        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 1) direction = 1;
        var isButtonDown = input.isButtonDown();
        var mouseJustClicked = !isButtonDown && wasButtonDown;

        if (mouseJustClicked && !transitioning) {
            transitioning = true;
            g_main.init();
	          g_isUpdatePaused = false;
        }
        wasButtonDown = isButtonDown;
    }

    return {
        draw: draw,
        update: update
    };

}(mouse));

// END OF THE MAIN SCREEN
