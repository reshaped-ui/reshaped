import { findClosestScrollableContainer } from "@/dom";
import { isIOS } from "@/platform";
import lockSafariScroll from "./lockSafari";
import lockStandardScroll from "./lockStandard";

const lockCounts = new WeakMap<HTMLElement, number>();
const lockResets = new WeakMap<HTMLElement, () => void>();

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

	const currentCount = lockCounts.get(container) ?? 0;

	if (currentCount === 0) {
		const reset =
			isIOSLock && lockedDocumentScroll
				? lockSafariScroll()
				: lockStandardScroll({ container });
		lockResets.set(container, reset);
	}

	lockCounts.set(container, currentCount + 1);
	args?.callback?.();

	let released = false;
	return (unlockArgs?: { callback?: () => void }) => {
		if (released) return;
		released = true;

		const nextCount = (lockCounts.get(container) ?? 1) - 1;
		if (nextCount <= 0) {
			lockCounts.delete(container);
			lockResets.get(container)?.();
			lockResets.delete(container);
		} else {
			lockCounts.set(container, nextCount);
		}

		unlockArgs?.callback?.();
	};
};
