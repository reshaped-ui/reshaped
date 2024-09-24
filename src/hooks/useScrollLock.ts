"use client";

import React from "react";
import useId from "hooks/useElementId";
import { lockScroll, unlockScroll } from "utilities/scroll";

const useScrollLock = () => {
	const [locked, setLocked] = React.useState(false);
	const id = useId();

	const handleLockScroll = React.useCallback(() => {
		lockScroll(id, () => setLocked(true));
	}, [id]);

	const handleUnlockScroll = React.useCallback(() => {
		unlockScroll(id, () => setLocked(false));
	}, [id]);

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
