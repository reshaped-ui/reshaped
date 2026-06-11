export const camelToKebab = (s: string) => {
	return s
		.replace(/([a-z]+)([A-Z0-9]+)/g, (_, p1, p2) =>
			// Keep values like x1 - as is
			p1.length === 1 && /^[0-9]+$/.test(p2) ? `${p1}${p2}` : `${p1}-${p2}`
		)
		.toLowerCase();
};

export const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};
