"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Presence.types";
import s from "./Presence.module.css";

const PresenceItem: React.FC<T.ItemProps> = (props) => {
	const { entry, status, itemClassName, enterClassName, exitClassName, onExited } = props;
	const elRef = React.useRef<HTMLSpanElement>(null);
	const itemClassNames = classNames(
		s.item,
		status && s[`--${status}`],
		itemClassName,
		status === "enter" && enterClassName,
		status === "exit" && exitClassName
	);

	const handleAnimationEnd = (e: React.AnimationEvent) => {
		if (status !== "exit" || e.target !== elRef.current) return;

		onExited(entry.id);
	};

	// Exiting items are removed when their animation ends, so the ones that never
	// start it have to be released here. Reduced motion keeps the animation and only
	// zeroes its duration, which makes it end on the next frame instead
	useIsomorphicLayoutEffect(() => {
		const el = elRef.current;

		if (status !== "exit" || !el) return;
		if (el.getAnimations().length > 0) return;

		onExited(entry.id);
	}, [status, entry.id, onExited]);

	return (
		<span
			ref={elRef}
			className={itemClassNames}
			aria-hidden={status === "exit" || undefined}
			onAnimationEnd={handleAnimationEnd}
		>
			{entry.children}
		</span>
	);
};

const Presence: React.FC<T.Props> = (props) => {
	const { children, itemKey, className, itemClassName, enterClassName, exitClassName, attributes } =
		props;
	const idRef = React.useRef(0);
	// Holds the children of the last committed render, which become the exiting ones on a key change
	const childrenRef = React.useRef(children);
	const [state, setState] = React.useState<T.State>(() => ({ id: 0, key: itemKey, exiting: [] }));

	// Rendering both children at the same time has to happen in the same pass as the key change,
	// otherwise the previous children get unmounted before we can animate them out
	if (state.key !== itemKey) {
		idRef.current += 1;

		setState({
			id: idRef.current,
			key: itemKey,
			status: "enter",
			exiting: [
				// An item swapped back in before it finished exiting is replaced by the new one
				...state.exiting.filter((entry) => entry.key !== itemKey),
				{ id: state.id, key: state.key, children: childrenRef.current },
			],
		});
	}

	const handleExited = React.useCallback((id: number) => {
		setState((prevState) => ({
			...prevState,
			exiting: prevState.exiting.filter((entry) => entry.id !== id),
		}));
	}, []);

	useIsomorphicLayoutEffect(() => {
		childrenRef.current = children;
	});

	const itemProps = { itemClassName, enterClassName, exitClassName, onExited: handleExited };

	return (
		<span {...attributes} className={classNames(s.root, className)}>
			{state.exiting.map((entry) => (
				<PresenceItem key={entry.id} entry={entry} status="exit" {...itemProps} />
			))}
			<PresenceItem
				key={state.id}
				entry={{ id: state.id, key: itemKey, children }}
				status={state.status}
				{...itemProps}
			/>
		</span>
	);
};

Presence.displayName = "Presence";

export default Presence;
