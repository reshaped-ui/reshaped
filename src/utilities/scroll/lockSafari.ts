import { StyleCache } from "utilities/css";

const styleCache = new StyleCache();

const lockSafariScroll = (containerEl?: HTMLElement | null) => {
	const viewport = containerEl || window.visualViewport;
	const offsetLeft = viewport?.offsetLeft || 0;
	const offsetTop = viewport?.offsetTop || 0;
	const scrollX = containerEl?.scrollLeft ?? window.scrollX;
	const scrollY = containerEl?.scrollTop ?? window.scrollY;

	styleCache.set(containerEl || document.body, {
		position: "fixed",
		top: `${-(scrollY - Math.floor(offsetTop))}px`,
		left: `${-(scrollX - Math.floor(offsetLeft))}px`,
		right: "0",
		overflow: "hidden",
	});

	return () => {
		styleCache.reset();
		window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });
	};
};

export default lockSafariScroll;
