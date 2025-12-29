import rafThrottle from "helpers/rafThrottle";

import applyPosition from "./utilities/applyPosition";
import findClosestScrollableContainer from "./utilities/findClosestScrollableContainer";

import type { Position, Options } from "./types";

class Flyout {
	#lastUsedPosition: Position | null = null;
	#options: Options;

	constructor(options: Options) {
		this.#options = options;
	}

	update = (options?: { fallback?: boolean }) => {
		const result = applyPosition({
			...this.#options,
			fallbackPositions: options?.fallback ? this.#options.fallbackPositions : [],
			lastUsedPosition: this.#lastUsedPosition,
		});

		if (!result) return;

		this.#lastUsedPosition = result.position;
	};

	open = () => {
		this.update();
		this.#addParentScrollHandler();
	};

	close = () => {
		this.#lastUsedPosition = null;
		this.#removeParentScrollHandler?.();
	};

	#removeParentScrollHandler: (() => void) | null = null;

	#addParentScrollHandler = () => {
		const { trigger, onClose } = this.#options;
		if (!trigger) return;

		const container = findClosestScrollableContainer({ el: trigger });

		if (!container) return;

		const handleScroll = rafThrottle(() => {
			const triggerBounds = trigger.getBoundingClientRect();
			const containerBounds = container.getBoundingClientRect();

			if (
				triggerBounds.top < containerBounds.top ||
				triggerBounds.left < containerBounds.left ||
				triggerBounds.right > containerBounds.right ||
				triggerBounds.bottom > containerBounds.bottom
			) {
				onClose();
			} else {
				this.update({ fallback: false });
			}
		});

		container.addEventListener("scroll", handleScroll, { passive: true });
		this.#removeParentScrollHandler = () => container.removeEventListener("scroll", handleScroll);
	};
}

export default Flyout;
