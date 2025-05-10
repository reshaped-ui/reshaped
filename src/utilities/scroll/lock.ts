import { isIOS } from "utilities/platform";
import { findClosestScrollableContainer } from "utilities/dom";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

let bodyLockedCount = 0;
let reset = () => {};

export const lockScroll = (args: {
	containerEl?: HTMLElement | null;
	originEl?: HTMLElement | null;
	cb?: () => void;
}) => {
	const isIOSLock = isIOS() && !args.containerEl && !args.originEl;

	let container = document.body;
	if (args.originEl && !isIOSLock) {
		container = findClosestScrollableContainer({ el: args.originEl });
	}
	if (args.containerEl && !isIOSLock) container = args.containerEl;

	if (container === document.body) bodyLockedCount += 1;
	if (bodyLockedCount > 1) return;

	if (isIOSLock) {
		reset = lockSafariScroll();
	} else {
		reset = lockStandardScroll({ container });
	}

	args.cb?.();
};

export const unlockScroll = (cb?: () => void) => {
	bodyLockedCount -= 1;

	if (bodyLockedCount > 0) return;

	reset();
	cb?.();
};
