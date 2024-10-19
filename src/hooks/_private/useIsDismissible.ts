/**
 * Singleton hook to check if multiple elements can be dismissed and returns flag only for the latest one
 * Example: Use to only close the latest opened Flyout/Modal
 */

import React from "react";
import useElementId from "hooks/useElementId";

type Ref = React.RefObject<HTMLElement>;
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

const useIsDismissible = (active: boolean = false, contentRef: Ref, triggerRef?: Ref) => {
	const id = useElementId();
	const isDismissible = React.useCallback(() => {
		return active ? latestId === id : true;
	}, [id, active]);

	React.useEffect(() => {
		if (!active) return;

		addToQueue(id, contentRef, triggerRef);
		return () => removeFromQueue(id);
	}, [active, id, contentRef, triggerRef]);

	return isDismissible;
};

export default useIsDismissible;
