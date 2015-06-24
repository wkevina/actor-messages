/*jshint esnext: true */

export default class App {
    constructor(renderer, stage) {
        this.renderer = renderer;
        this.stage = stage;

        this.keepRunning = false;
    }

    start() {
        this.keepRunning = true;

        let run = () => {
            if (this.keepRunning) {
                this.renderer.render(this.stage);
                requestAnimationFrame(run);
            }
        };

		run();

    }

    stop() {
        this.keepRunning = false;
    }
}
