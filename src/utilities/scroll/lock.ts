import { isIOS } from "utilities/platform";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

let lockedCount = 0;
let reset = () => {};

export const lockScroll = (args: { containerEl?: HTMLElement | null; cb?: () => void }) => {
	lockedCount += 1;

	if (lockedCount > 1) return;

	if (isIOS()) {
		reset = lockSafariScroll();
	} else {
		reset = lockStandardScroll(args.containerEl);
	}

	args.cb?.();
};

export const unlockScroll = (cb?: () => void) => {
	lockedCount -= 1;

	if (lockedCount > 0) return;

	reset();
	cb?.();
};
