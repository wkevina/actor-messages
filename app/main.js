/*jshint esnext: true */

import App from 'app';

export function main() {
	const renderer = new PIXI.autoDetectRenderer(800, 500);

	document.getElementById('content').appendChild(renderer.view);

	const stage = new PIXI.Container();

	const app = new App(renderer, stage);

	app.start();
}
