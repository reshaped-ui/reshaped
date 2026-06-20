type Styles = Record<string, string>;

class StyleCache {
	cache: Map<HTMLElement, Styles> = new Map();

	set = (el: HTMLElement, styles: Styles) => {
		// Already cached (locked) — keep the originals captured the first time and
		// don't reapply, so locking an element that's already locked is a no-op.
		if (this.cache.has(el)) return;

		const originalStyles: Styles = {};
		Object.keys(styles).forEach((key) => {
			originalStyles[key] = el.style.getPropertyValue(key);
		});

		this.cache.set(el, originalStyles);
		Object.assign(el.style, styles);
	};

	reset = (el: HTMLElement) => {
		const styles = this.cache.get(el);
		if (!styles) return;

		Object.assign(el.style, styles);
		this.cache.delete(el);
	};
}

export default StyleCache;
