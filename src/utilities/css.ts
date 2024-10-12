type Styles = Record<string, string>;

export class StyleCache {
	cache: Map<HTMLElement, Record<string, string>> = new Map();

	set = (el: HTMLElement, styles: Styles) => {
		const originalStyles: Styles = {};
		const cachedStyles = this.cache.get(el);

		Object.keys(styles).forEach((key) => {
			originalStyles[key] = el.style.getPropertyValue(key);
		});

		this.cache.set(el, { ...originalStyles, ...cachedStyles });
		Object.assign(el.style, styles);
	};

	reset = () => {
		for (const [el, styles] of this.cache.entries()) {
			Object.assign(el.style, styles);
		}

		this.cache.clear();
	};
}
