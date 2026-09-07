import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Status = "enter" | "exit";

export type Entry = {
	id: number;
	key: unknown;
	children?: React.ReactNode;
};

export type State = {
	/** Id of the currently rendered entry */
	id: number;
	/** Key the currently rendered entry was rendered with */
	key: unknown;
	/** Undefined until the first swap happens to avoid animating on mount */
	status?: Status;
	/** Entries kept mounted until their exit animation ends */
	exiting: Entry[];
};

export type ItemProps = Pick<Props, "itemClassName" | "enterClassName" | "exitClassName"> & {
	as: keyof React.JSX.IntrinsicElements;
	entry: Entry;
	status?: Status;
	onExited: (id: number) => void;
};

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	children?: React.ReactNode;
	/**
	 * Identity of the current children, compared by reference.
	 * Changing it renders the previous and the next children at the same time
	 */
	itemKey: unknown;
	/** Render the root and every item as a different element */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Classname of every rendered item */
	itemClassName?: ClassName;
	/** Classname of the item animating in, added on every change except the first render */
	enterClassName?: ClassName;
	/** Classname of the item animating out, the item is removed when its animation ends */
	exitClassName?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName>;
};
