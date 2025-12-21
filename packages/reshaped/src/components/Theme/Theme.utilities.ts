export const getRootThemeEl = (scopeEl?: HTMLElement | null): HTMLElement => {
	if (!scopeEl) return document.documentElement;

	if (
		scopeEl.hasAttribute("data-rs-root") ||
		scopeEl === document.documentElement ||
		!scopeEl.parentElement
	) {
		return scopeEl;
	}

	return getRootThemeEl(scopeEl.parentElement);
};
