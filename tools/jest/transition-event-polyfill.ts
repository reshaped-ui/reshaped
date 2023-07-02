/**
 * Implemented based on:
 * https://github.com/hello-pangea/dnd/commit/5ec5a7467882e66bd707bbb4fb7426b70f462ac5#diff-3ab6990a471fa18593a64b7c0de508ff724cd1cd0676d882d475fb40fe624660=
 *
 * Original jsdom issue:
 * https://github.com/jsdom/jsdom/issues/1781
 */

export default function transitionEventPolyfill() {
	class TransitionEvent extends window.Event {
		readonly elapsedTime: number;
		readonly propertyName: string;
		readonly pseudoElement: string;

		constructor(type: string, transitionEventInitDict: TransitionEventInit = {}) {
			super(type, transitionEventInitDict);

			this.elapsedTime = transitionEventInitDict.elapsedTime || 0.0;
			this.propertyName = transitionEventInitDict.propertyName || "";
			this.pseudoElement = transitionEventInitDict.pseudoElement || "";
		}
	}

	window.TransitionEvent = TransitionEvent;
}
