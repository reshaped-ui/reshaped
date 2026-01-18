"use client";

import { lockScroll } from "@reshaped/utilities";
import React from "react";

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
			callback: () => setLocked(true),
		});
	}, [containerRef, originRef]);

	const handleUnlockScroll = React.useCallback(() => {
		unlockScrollRef.current?.({ callback: () => setLocked(false) });
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
