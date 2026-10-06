"use client";

import React from "react";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Freeze.types";
import s from "./Freeze.module.css";

/**
 * Time given to a frozen render to get committed before giving up on freezing.
 * Synchronous updates commit right away, while transitions never commit an already visible
 * Suspense boundary switching to its fallback and would otherwise wait for it forever
 */
const COMMIT_TIMEOUT = 100;

const neverResolved = new Promise<void>(() => {});

const Suspender: React.FC<T.SuspenderProps> = (props) => {
	const { frozen, frozenRef, children } = props;
	const state = frozenRef.current;

	if (!frozen || state.expired) return children;
	if (state.committed) throw neverResolved;

	if (!state.pending) {
		state.pending = new Promise<void>((resolve) => {
			setTimeout(() => {
				if (!state.committed) state.expired = true;
				resolve();
			}, COMMIT_TIMEOUT);
		});
	}

	throw state.pending;
};

/**
 * Keeps the last rendered output of its children on the screen while frozen, ignoring any updates
 * coming from their props, state or context. Used for exit animations, so content doesn't change
 * while it's animating out, for example when the selected value changes after closing a menu.
 *
 * Frozen children are suspended without a fallback, so React keeps their DOM in place and stops
 * committing changes to it. React hides suspended DOM nodes, so the wrapper element is revealed back
 * in the same commit before the browser paints
 */
const Freeze: React.FC<T.Props> = (props) => {
	const { frozen, children } = props;
	const frozenRef = React.useRef<T.FrozenState>({ committed: false, expired: false });
	// React detaches refs inside suspended trees, so we keep the last attached element instead
	const elRef = React.useRef<HTMLDivElement | null>(null);
	const attachRef = React.useCallback((el: HTMLDivElement | null) => {
		if (el) elRef.current = el;
	}, []);

	useIsomorphicLayoutEffect(() => {
		const state = frozenRef.current;

		if (!frozen) {
			frozenRef.current = { committed: false, expired: false };
			return;
		}

		if (state.expired) return;

		state.committed = true;
		elRef.current?.style.removeProperty("display");
	}, [frozen]);

	return (
		<React.Suspense fallback={null}>
			<div className={s.root} ref={attachRef}>
				<Suspender frozen={frozen} frozenRef={frozenRef}>
					{children}
				</Suspender>
			</div>
		</React.Suspense>
	);
};

Freeze.displayName = "Freeze";

export default Freeze;
