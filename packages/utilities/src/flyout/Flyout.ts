import { findClosestScrollableContainer } from "@/dom";
import { rafThrottle } from "@/helpers";
import type { ContentMeasurements, Options, Position } from "./types";
import applyPosition from "./utilities/applyPosition";

class Flyout {
	#active = false;
	#lastUsedPosition: Position | null = null;
	#options: Options;
	#handlerCleanupMap: Record<string, () => void> = {};
	/**
	 * Measuring the content is the most expensive part of the positioning since it clones and lays out all of its nodes.
	 * Its size doesn't depend on where the content is positioned, so the measurements are kept
	 * for the updates that only follow the trigger and are dropped whenever the size could have changed
	 */
	#measurements: ContentMeasurements = new Map();
	/** Size the content has taken with the last applied position */
	#appliedSize: { width: number; height: number } | null = null;

	constructor(options: Options) {
		this.#options = options;
	}

	#update = (options?: { keepMeasurements?: boolean }): ReturnType<typeof applyPosition> => {
		if (!options?.keepMeasurements) this.#measurements.clear();

		const result = applyPosition({
			...this.#options,
			lastUsedPosition: this.#lastUsedPosition,
			measurements: this.#measurements,
		});

		const { width, height } = this.#options.content.getBoundingClientRect();
		this.#appliedSize = { width, height };

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

			// Scrolling moves the trigger without resizing the content
			if (!container) {
				this.#update({ keepMeasurements: true });
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
				this.#update({ keepMeasurements: true });
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
		const { content } = this.#options;

		const handleResize = () => {
			if (!this.#active) return;
			this.#update();
		};

		const observer = new ResizeObserver(() => {
			if (!this.#active) return;

			// Observer reports the content when it starts observing it and every time its size changes,
			// including the size applied with the position. Content is only measured again when it was resized from the outside
			const size = content.getBoundingClientRect();
			const resized =
				size.width !== this.#appliedSize?.width || size.height !== this.#appliedSize?.height;

			this.#update({ keepMeasurements: !resized });
		});

		window.addEventListener("resize", handleResize);
		if (this.#options.trigger) observer.observe(this.#options.trigger);
		if (this.#options.content) observer.observe(this.#options.content);
		if (this.#options.container) observer.observe(this.#options.container);

		this.#handlerCleanupMap.resize = () => {
			observer.disconnect();
			window.removeEventListener("resize", handleResize);
		};
	};

	/**
	 * Content with an applied width or height keeps its size when its children change,
	 * so the resize handler doesn't catch the changes of the size it would take without them
	 */
	#addMutationHandler = () => {
		const { content } = this.#options;
		const observer = new MutationObserver((records) => {
			const changed = records.some((record) => {
				// Position is applied with the inline styles of the content
				return record.target !== content || record.attributeName !== "style";
			});

			if (changed) this.#measurements.clear();
		});

		observer.observe(content, {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true,
		});

		this.#handlerCleanupMap.mutation = () => observer.disconnect();
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
		this.#addMutationHandler();
		this.#active = true;

		return result;
	};

	deactivate = () => {
		this.#lastUsedPosition = null;
		this.#active = false;
		this.#measurements.clear();
		this.#appliedSize = null;
		this.#removeHandlers();
	};
}

export default Flyout;
