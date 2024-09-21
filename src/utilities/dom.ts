export const getClosestFlyoutTarget = (el: HTMLElement | null): HTMLElement => {
	const style = el && window.getComputedStyle(el);
	const overflowY = style?.overflowY;
	const position = style?.position;
	const isScrollable = overflowY?.includes("scroll");
	const isFixed = position === "fixed" || position === "sticky";

	if (el === document.body || !el) return document.body;
	if ((isScrollable && el.scrollHeight > el.clientHeight) || isFixed) return el;
	return getClosestFlyoutTarget(el.parentElement);
};

export const disableUserSelect = () => {
	document.body.style.userSelect = "none";
};

export const enableUserSelect = () => {
	document.body.style.userSelect = "";
};

const preventDefault = (e: Event) => e.preventDefault();

export const disableScroll = () => {
	window.addEventListener("wheel", preventDefault, { passive: false });
	window.addEventListener("touchmove", preventDefault, { passive: false });
};

export const enableScroll = () => {
	window.removeEventListener("wheel", preventDefault);
	window.removeEventListener("touchmove", preventDefault);
};

export const getShadowRoot = (el: HTMLElement | null) => {
	const rootNode = el?.getRootNode();
	return rootNode instanceof ShadowRoot ? rootNode : null;
};
