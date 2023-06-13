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
	const parentItem = latestId ? queue[latestId] : undefined;
	const insideParent =
		triggerRef?.current &&
		parentItem &&
		parentItem.contentRef.current?.contains(triggerRef.current);

	if (!insideParent && triggerRef && latestId) {
		removeFromQueue(latestId);
	}

	queue[id] = { parentId: latestId, triggerRef, contentRef };
	latestId = id;
};

const useIsDismissible = (active: boolean = false, contentRef: Ref, triggerRef?: Ref) => {
	const id = useElementId();
	const isDismissible = React.useCallback(() => latestId === id, [id]);

	React.useEffect(() => {
		if (active) {
			addToQueue(id, contentRef, triggerRef);
		} else {
			removeFromQueue(id);
		}
	}, [active, id, contentRef, triggerRef]);

	return isDismissible;
};

export default useIsDismissible;
