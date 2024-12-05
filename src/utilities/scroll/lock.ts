import { isIOS } from "utilities/platform";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";
import { findClosestRenderContainer } from "utilities/dom";

let lockedCount = 0;
let reset = () => {};

export const lockScroll = (args: { containerEl?: HTMLElement | null; cb?: () => void }) => {
	lockedCount += 1;

	if (lockedCount > 1) return;

	const customLockTargetEl = args.containerEl
		? findClosestRenderContainer({ el: args.containerEl, overflowOnly: true })
		: undefined;

	if (isIOS()) {
		reset = lockSafariScroll(customLockTargetEl);
	} else {
		reset = lockStandardScroll(customLockTargetEl);
	}

	args.cb?.();
};

export const unlockScroll = (cb?: () => void) => {
	lockedCount -= 1;

	if (lockedCount > 0) return;

	reset();
	cb?.();
};
