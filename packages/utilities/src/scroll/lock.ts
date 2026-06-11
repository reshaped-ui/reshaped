import { findClosestScrollableContainer } from "@/dom";
import { isIOS } from "@/platform";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

export const lockScroll = (args?: {
	containerEl?: HTMLElement | null;
	originEl?: HTMLElement | null;
	callback?: () => void;
}) => {
	const isIOSLock = isIOS();
	let reset = () => {};

	const container =
		args?.containerEl ??
		(args?.originEl && findClosestScrollableContainer({ el: args.originEl })) ??
		document.documentElement;
	const lockedDocumentScroll = container === document.documentElement;

	// Already locked so no need to lock again and trigger the callback
	if (container.style.overflow === "hidden") return;

	if (isIOSLock && lockedDocumentScroll) {
		reset = lockSafariScroll();
	} else {
		reset = lockStandardScroll({ container });
	}

	args?.callback?.();

	return (args?: { callback?: () => void }) => {
		reset();
		args?.callback?.();
	};
};
