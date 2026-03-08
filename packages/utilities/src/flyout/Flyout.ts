import { findClosestScrollableContainer } from "@/dom";
import { rafThrottle } from "@/helpers";

import applyPosition from "./utilities/applyPosition";

import type { Options, Position } from "./types";

class Flyout {
	#active = false;
	#lastUsedPosition: Position | null = null;
	#options: Options;
	#handlerCleanupMap: Record<string, () => void> = {};

	constructor(options: Options) {
		this.#options = options;
	}

	#update = (): ReturnType<typeof applyPosition> => {
		const result = applyPosition({
			...this.#options,
			lastUsedPosition: this.#lastUsedPosition,
		});

		this.#lastUsedPosition = result.position;
		return result;
	};

	#addParentScrollHandler = () => {
		const { trigger, onDeactivate } = this.#options;
		if (!trigger) return;

		const container = findClosestScrollableContainer({ el: trigger });
		const root = container || window;

		const handleScroll = rafThrottle(() => {
			if (!this.#active) return;

			if (!container) {
				this.#update();
				return;
			}

			const triggerBounds = trigger.getBoundingClientRect();
			const containerBounds = container.getBoundingClientRect();

			if (
				triggerBounds.top < containerBounds.top ||
				triggerBounds.left < containerBounds.left ||
				triggerBounds.right > containerBounds.right ||
				triggerBounds.bottom > containerBounds.bottom
			) {
				onDeactivate();
			} else {
				this.#update();
			}
		});

		root.addEventListener("scroll", handleScroll, { passive: true });
		this.#handlerCleanupMap.scroll = () => root.removeEventListener("scroll", handleScroll);
	};

	#addRTLHandler = () => {
		const observer = new MutationObserver(() => {
			if (!this.#active) return;
			this.#update();
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["dir"],
		});

		this.#handlerCleanupMap.rtl = () => observer.disconnect();
	};

	#addResizeHandler = () => {
		const handleResize = () => {
			if (!this.#active) return;
			this.#update();
		};

		const observer = new ResizeObserver(handleResize);

		window.addEventListener("resize", handleResize);
		if (this.#options.trigger) observer.observe(this.#options.trigger);
		if (this.#options.content) observer.observe(this.#options.content);

		this.#handlerCleanupMap.resize = () => {
			observer.disconnect();
			window.removeEventListener("resize", handleResize);
		};
	};

	#removeHandlers = () => {
		Object.values(this.#handlerCleanupMap).forEach((cleanup) => cleanup());
		this.#handlerCleanupMap = {};
	};

	/**
	 * Public methods
	 */

	update = (options?: Partial<Options>): ReturnType<typeof applyPosition> => {
		if (options) this.#options = { ...this.#options, ...options };
		return this.#update();
	};

	activate = (): ReturnType<typeof this.update> => {
		const result = this.#update();

		this.#addParentScrollHandler();
		this.#addRTLHandler();
		this.#addResizeHandler();
		this.#active = true;

		return result;
	};

	deactivate = () => {
		this.#lastUsedPosition = null;
		this.#active = false;
		this.#removeHandlers();
	};
}

export default Flyout;
