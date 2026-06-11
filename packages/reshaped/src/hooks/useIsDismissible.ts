/**
 * Singleton hook to check if multiple elements can be dismissed and returns flag only for the latest one
 * Example: Use to only close the latest opened Flyout/Modal
 */

import React from "react";

import useElementId from "@/hooks/useElementId";

type Ref = React.RefObject<HTMLElement | null>;
type QueueItem = { triggerRef?: Ref; contentRef: Ref; parentId: string | null };

let queue: Record<string, QueueItem> = {};
let latestId: string | null = null;

const removeFromQueue = (id: string) => {
	const item = queue[id];
	if (!item) return;

	Object.values(queue).forEach((queueItem) => {
		if (queueItem.parentId === id) {
			queueItem.parentId = item.parentId;
		}
	});

	if (latestId === id) latestId = item.parentId;
	delete queue[id];
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

		addToQueue(id, contentRef, triggerRef);
		return () => removeFromQueue(id);
	}, [active, id, contentRef, triggerRef]);

	return React.useCallback(() => {
		if (!active) return true;

		const latest = latestId ? queue[latestId] : undefined;
		const latestTrigger = latest?.triggerRef?.current;
		const prev = latest?.parentId ? queue[latest.parentId] : undefined;
		const prevContent = prev?.contentRef.current;
		const nested = prevContent && latestTrigger && prevContent.contains(latestTrigger);

		// Don't block independently rendered components that are not nested in each other
		if (triggerRef?.current && !nested) return true;
		return !latestId || latestId === id;
	}, [id, active, triggerRef]);
};

export default useIsDismissible;
