"use client";

import React from "react";
import { lockScroll, unlockScroll } from "utilities/scroll";

const useScrollLock = (options?: {
	containerRef?: React.RefObject<HTMLElement | null>;
	originRef?: React.RefObject<HTMLElement | null>;
}) => {
	const { containerRef, originRef } = options || {};
	const [locked, setLocked] = React.useState(false);

	const handleLockScroll = React.useCallback(() => {
		lockScroll({
			containerEl: containerRef?.current,
			originEl: originRef?.current,
			cb: () => setLocked(true),
		});
	}, [containerRef, originRef]);

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
