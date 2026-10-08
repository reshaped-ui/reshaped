"use client";

import React from "react";

import type * as T from "./Freeze.types";
import s from "./Freeze.module.css";

/**
 * Transitions never commit an already visible Suspense boundary switching to its fallback,
 * so we stop freezing if the frozen render isn't committed in time instead of blocking them forever
 */
const COMMIT_TIMEOUT = 100;
const infinitePromise = new Promise<never>(() => {});

const Suspend: React.FC<{ stateRef: React.RefObject<T.State> }> = (props) => {
	const state = props.stateRef.current;

	if (state.expired) return null;
	if (state.committed) throw infinitePromise;

	state.pending ??= new Promise((resolve) => {
		setTimeout(() => {
			state.expired = !state.committed;
			resolve();
		}, COMMIT_TIMEOUT);
	});

	throw state.pending;
};

const Freeze: React.FC<T.Props> = (props) => {
	const { frozen, children } = props;
	const stateRef = React.useRef<T.State>({});
	const elRef = React.useRef<HTMLDivElement | null>(null);

	// Insertion effect is the earliest opportunity to undo the Suspense display: none
	React.useInsertionEffect(() => {
		if (!frozen) {
			stateRef.current = {};
			return;
		}

		if (stateRef.current.expired) return;

		stateRef.current.committed = true;
		elRef.current?.style.removeProperty("display");
	}, [frozen]);

	return (
		<React.Suspense>
			{/* React detaches refs in suspended trees, so we keep the last attached element */}
			<div
				className={s.root}
				ref={(el) => {
					if (el) elRef.current = el;
				}}
			>
				{frozen && <Suspend stateRef={stateRef} />}
				{children}
			</div>
		</React.Suspense>
	);
};

Freeze.displayName = "Freeze";

export default Freeze;
