import rafThrottle from "helpers/rafThrottle";

import applyPosition from "./utilities/applyPosition";
import findClosestScrollableContainer from "./utilities/findClosestScrollableContainer";

import type { Position, Options } from "./types";

class Flyout {
	#active = false;
	#lastUsedPosition: Position | null = null;
	#options: Options;
	#handlerCleanupMap: Record<string, () => void> = {};

	constructor(options: Options) {
		this.#options = options;
	}

	#addParentScrollHandler = () => {
		const { trigger, onClose } = this.#options;
		if (!trigger) return;

		const container = findClosestScrollableContainer({ el: trigger });

		if (!container) return;

		const handleScroll = rafThrottle(() => {
			if (!this.#active) return;

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
		this.#handlerCleanupMap.scroll = () => container.removeEventListener("scroll", handleScroll);
	};

	#addRTLHandler = () => {
		const observer = new MutationObserver(() => {
			if (!this.#active) return;
			this.update();
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["dir"],
		});

		this.#handlerCleanupMap.rtl = () => observer.disconnect();
	};

	#addResizeHandler = () => {
		const observer = new ResizeObserver(() => {
			if (!this.#active) return;
			this.update();
		});

		observer.observe(document.documentElement);
		if (this.#options.trigger) observer.observe(this.#options.trigger);
		if (this.#options.content) observer.observe(this.#options.content);

		this.#handlerCleanupMap.resize = () => observer.disconnect();
	};

	#removeHandlers = () => {
		Object.values(this.#handlerCleanupMap).forEach((cleanup) => cleanup());
		this.#handlerCleanupMap = {};
	};

	/**
	 * Public methods
	 */

	update = (options?: { fallback?: boolean }): ReturnType<typeof applyPosition> => {
		const result = applyPosition({
			...this.#options,
			fallbackPositions: options?.fallback === false ? [] : this.#options.fallbackPositions,
			lastUsedPosition: this.#lastUsedPosition,
		});

		this.#lastUsedPosition = result.position;
		return result;
	};

	open = (): ReturnType<typeof this.update> => {
		const result = this.update();

		this.#addParentScrollHandler();
		this.#addRTLHandler();
		this.#addResizeHandler();
		this.#active = true;

		return result;
	};

	close = () => {
		this.#lastUsedPosition = null;
		this.#active = false;
		this.#removeHandlers();
	};
}

export default Flyout;
