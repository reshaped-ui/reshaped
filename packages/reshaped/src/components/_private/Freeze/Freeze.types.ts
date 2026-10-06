import type React from "react";

export type Props = {
	/** Stop committing updates to the children and keep their last rendered output on the screen */
	frozen: boolean;
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type SuspenderProps = Props & {
	frozenRef: React.RefObject<FrozenState>;
};

export type FrozenState = {
	/** Frozen render was committed, children have to stay suspended until unfrozen */
	committed: boolean;
	/** Pending suspension used to detect renders that never get committed */
	pending?: Promise<void>;
	/** Pending suspension expired without a commit, children are rendered without freezing */
	expired: boolean;
};
