/*jshint esnext: true */

import App from 'app';

export function main() {
    const renderer = new PIXI.autoDetectRenderer(800, 500);

    document.getElementById('content').appendChild(renderer.view);

    const stage = new PIXI.Container();

    const app = new App(renderer, stage);

    app.start();

    let e = new Emitter(app.broker);
    let l = new Listener(app.broker);
    let r = new Reactor(app.broker);

    l.register('type1', e);
    r.register('type1', e);

    setTimeout(() => e.emitMessage('type1', {
        type: 'type1',
        param: 'hey'
    }), 1000);
}

class Emitter {
    constructor(broker) {
        this.broker = broker;
    }

    emitMessage(type, content) {
        this.broker.emitBroadcastMessage(this, type, content);
    }
}

class Listener {
    constructor(broker) {
        this.broker = broker;
    }

    register(type, sender) {
        this.broker.registerBroadcastListener(this, (message) => {
            console.log(message);
        }, type, sender);
    }
}

class Reactor extends Listener {
    constructor(broker) {
        super(broker);
    }

    register(type, sender) {
        this.broker.registerBroadcastListener(this, this.react, type, sender);
    }

    react(message) {
        console.log(message);
    }
}
