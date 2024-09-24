const cachedStyles = new Map<HTMLElement, Partial<CSSStyleDeclaration>>();

export const setStyle = <T extends keyof CSSStyleDeclaration>(
	el: HTMLElement,
	property: T,
	value: CSSStyleDeclaration[T]
) => {
	const cachedElStyles = cachedStyles.get(el) || {};

	// Only save the first saved style to cache
	if (cachedElStyles[property] === undefined) {
		cachedElStyles[property] = el.style[property] ?? undefined;
		cachedStyles.set(el, cachedElStyles);
	}

	el.style[property] = value;
};

export const resetStyles = () => {
	const els = cachedStyles.keys();

	Array.from(els).forEach((el) => {
		const elStyles = cachedStyles.get(el);

		if (!elStyles) return;

		Object.keys(elStyles).forEach((key) => {
			const originalValue = elStyles[key as keyof CSSStyleDeclaration];

			if (originalValue === undefined) {
				el.style.removeProperty(key);
			} else {
				// @ts-ignore
				el.style[key] = originalValue;
			}
		});
	});

	cachedStyles.clear();
};
