"use client";

import React from "react";
import { lockScroll, unlockScroll } from "utilities/scroll";

const useScrollLock = (props?: { containerRef?: React.RefObject<HTMLElement | null> }) => {
	const { containerRef } = props || {};
	const [locked, setLocked] = React.useState(false);

	const handleLockScroll = React.useCallback(() => {
		lockScroll({ containerEl: containerRef?.current, cb: () => setLocked(true) });
	}, [containerRef]);

	const handleUnlockScroll = React.useCallback(() => {
		unlockScroll(() => setLocked(false));
	}, []);

	return React.useMemo(
		() => ({
			scrollLocked: locked,
			lockScroll: handleLockScroll,
			unlockScroll: handleUnlockScroll,
		}),
		[locked, handleLockScroll, handleUnlockScroll]
	);
};

export default useScrollLock;
