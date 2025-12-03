import { findClosestScrollableContainer } from "utilities/dom";
import { isIOS } from "utilities/platform";

import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

let bodyLockedCount = 0;

export const lockScroll = (args: {
	containerEl?: HTMLElement | null;
	originEl?: HTMLElement | null;
	cb?: () => void;
}) => {
	const isIOSLock = isIOS();
	let reset = () => {};

	let container = document.body;
	if (args.originEl) container = findClosestScrollableContainer({ el: args.originEl });
	if (args.containerEl) container = args.containerEl;

	const lockedBodyScroll = container === document.body;

	if (lockedBodyScroll) bodyLockedCount += 1;
	if (lockedBodyScroll && bodyLockedCount > 1) return;

	if (isIOSLock && lockedBodyScroll) {
		reset = lockSafariScroll();
	} else {
		reset = lockStandardScroll({ container });
	}

	args.cb?.();

	return (cb?: () => void) => {
		if (lockedBodyScroll) bodyLockedCount -= 1;

		reset();
		cb?.();
	};
};
