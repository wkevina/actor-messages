/*jshint esnext: true */

import MessageBroker from 'broker';

export default class App {
    constructor(renderer, stage) {
        this.renderer = renderer;
        this.stage = stage;

        this.keepRunning = false;

        this.broker = new MessageBroker();
    }

    start() {
        this.keepRunning = true;

        let run = () => {
            if (this.keepRunning) {
                this.broker.deliverMessages();
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
