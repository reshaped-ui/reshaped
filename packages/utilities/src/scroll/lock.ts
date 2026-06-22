import { findClosestScrollableContainer } from "@/dom";
import { isIOS } from "@/platform";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

const locks = new WeakMap<HTMLElement, { count: number; reset: () => void }>();

export const lockScroll = (args?: {
	containerEl?: HTMLElement | null;
	originEl?: HTMLElement | null;
	callback?: () => void;
}) => {
	const isIOSLock = isIOS();

	const container =
		args?.containerEl ??
		(args?.originEl && findClosestScrollableContainer({ el: args.originEl })) ??
		document.documentElement;
	const lockedDocumentScroll = container === document.documentElement;

	let lock = locks.get(container);
	if (!lock) {
		const reset =
			isIOSLock && lockedDocumentScroll ? lockSafariScroll() : lockStandardScroll({ container });
		lock = { count: 0, reset };
		locks.set(container, lock);
	}

	lock.count++;
	args?.callback?.();

	let released = false;
	return (unlockArgs?: { callback?: () => void }) => {
		if (released) return;
		released = true;

		if (--lock.count <= 0) {
			lock.reset();
			locks.delete(container);
		}

		unlockArgs?.callback?.();
	};
};
