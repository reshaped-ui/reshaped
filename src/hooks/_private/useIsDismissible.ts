/**
 * Singleton hook to check if multiple elements can be dismissed and returns flag only for the latest one
 * Example: Use to only close the latest opened Flyout/Modal
 */

import React from "react";
import useElementId from "hooks/useElementId";
import { onNextFrame } from "utilities/animation";

type Ref = React.RefObject<HTMLElement | null>;
type QueueItem = { triggerRef?: Ref; contentRef: Ref; parentId: string | null };

let queue: Record<string, QueueItem> = {};
let latestId: string | null = null;

const removeFromQueue = (id: string) => {
	// Ignore removal of non-existing ids when called on component mount with active: false
	if (!queue[id]) return;

	if (id === latestId) latestId = queue[id].parentId;
	delete queue[id];

	// Clear up all unused ids after the queue is resolved
	if (latestId === null) queue = {};
};

const addToQueue = (id: string, contentRef: Ref, triggerRef?: Ref) => {
	queue[id] = { parentId: latestId, triggerRef, contentRef };
	latestId = id;
};

const useIsDismissible = (args: { active?: boolean; contentRef: Ref; triggerRef?: Ref }) => {
	const { active, contentRef, triggerRef } = args;
	const id = useElementId();

	React.useEffect(() => {
		if (!active) return;

		onNextFrame(() => addToQueue(id, contentRef, triggerRef));
		return () => removeFromQueue(id);
	}, [active, id, contentRef, triggerRef]);

	return React.useCallback(() => {
		if (!active) return true;

		const latest = latestId ? queue[latestId] : undefined;
		const latestTrigger = latest?.triggerRef?.current;
		const prev = latest?.parentId ? queue[latest.parentId] : undefined;
		const prevContent = prev?.contentRef.current;

		// Don't block independently rendered components that are not nested in each other
		if (!prevContent || !latestTrigger || !prevContent.contains(latestTrigger)) return true;
		return latestId === id;
	}, [id, active]);
};

export default useIsDismissible;
