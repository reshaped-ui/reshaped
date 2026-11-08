type Styles = Record<string, string>;

class StyleCache {
	cache: Map<HTMLElement, Styles> = new Map();

	set = (el: HTMLElement, styles: Styles) => {
		// Already cached (locked) — keep the originals captured the first time and
		// don't reapply, so locking an element that's already locked is a no-op.
		if (this.cache.has(el)) return;

		// Reading through the style object supports both camelCase and kebab-case keys, same as Object.assign
		const elStyles = el.style as unknown as Styles;
		const originalStyles: Styles = {};
		Object.keys(styles).forEach((key) => {
			originalStyles[key] = elStyles[key];
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
