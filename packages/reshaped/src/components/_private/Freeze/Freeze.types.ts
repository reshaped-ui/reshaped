import type React from "react";

export type Props = {
	/** Stop committing updates to the children and keep their last rendered output on the screen */
	frozen: boolean;
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type State = {
	/** Frozen render was committed, children stay suspended until unfrozen */
	committed?: boolean;
	/** Frozen render wasn't committed in time, children render without freezing */
	expired?: boolean;
	pending?: Promise<void>;
};
