"use client";

import React from "react";

import { lockScroll } from "utilities/scroll";

const useScrollLock = (options?: {
	containerRef?: React.RefObject<HTMLElement | null>;
	originRef?: React.RefObject<HTMLElement | null>;
}) => {
	const { containerRef, originRef } = options || {};
	const [locked, setLocked] = React.useState(false);
	const unlockScrollRef = React.useRef<ReturnType<typeof lockScroll> | null>(null);

	const handleLockScroll = React.useCallback(() => {
		unlockScrollRef.current = lockScroll({
			containerEl: containerRef?.current,
			originEl: originRef?.current,
			cb: () => setLocked(true),
		});
	}, [containerRef, originRef]);

	const handleUnlockScroll = React.useCallback(() => {
		unlockScrollRef.current?.(() => setLocked(false));
		unlockScrollRef.current = null;
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
