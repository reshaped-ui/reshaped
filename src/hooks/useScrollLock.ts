"use client";

import React from "react";
import { lockScroll, unlockScroll } from "utilities/scroll";

const useScrollLock = () => {
	const [locked, setLocked] = React.useState(false);

	const handleLockScroll = React.useCallback(() => {
		lockScroll(() => setLocked(true));
	}, []);

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
