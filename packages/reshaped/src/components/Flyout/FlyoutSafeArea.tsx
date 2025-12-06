"use client";

import React from "react";

import { useFlyoutContext } from "./Flyout.context";
import getSafeAreaPolygon from "./utilities/getSafeAreaPolygon";

import type * as T from "./Flyout.types";

const SAFE_AREA_TIMEOUT = 2000;

type Props = {
	position: T.Position;
	/** Coordinates where mouse left the trigger - origin point of the triangle */
	origin: { x: number; y: number };
};

/**
 * FlyoutSafeArea creates an invisible polygon "bridge" between the trigger
 * and the flyout content, allowing smooth mouse movement without closing the flyout.
 *
 * The polygon is a triangle from the mouse exit point to the content edges.
 * It renders once on trigger mouseout and auto-hides after 2 seconds.
 */
const FlyoutSafeArea: React.FC<Props> = (props) => {
	const { position, origin } = props;
	const { flyoutElRef, handleMouseEnter, handleMouseLeave } = useFlyoutContext();

	const [polygon, setPolygon] = React.useState<string | null>(null);
	const [visible, setVisible] = React.useState(true);

	// Calculate polygon once on mount using the origin coordinates
	React.useEffect(() => {
		const flyoutEl = flyoutElRef.current;
		if (!flyoutEl) return;

		// Get the inner content element (last child, after the safe area SVG)
		const innerEl = flyoutEl.lastElementChild;
		if (!innerEl) return;

		const contentRect = innerEl.getBoundingClientRect();
		const wrapperRect = flyoutEl.getBoundingClientRect();

		const newPolygon = getSafeAreaPolygon(origin, contentRect, wrapperRect, position);
		setPolygon(newPolygon);
	}, [flyoutElRef, position, origin]);

	// Auto-hide after timeout
	React.useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, SAFE_AREA_TIMEOUT);

		return () => clearTimeout(timer);
	}, []);

	if (!polygon || !visible) return null;

	return (
		<svg
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				overflow: "visible",
				pointerEvents: "none",
			}}
		>
			<polygon
				points={polygon}
				fill="transparent"
				style={{ pointerEvents: "auto", fill: "tomato" }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
		</svg>
	);
};

FlyoutSafeArea.displayName = "FlyoutSafeArea";

export default FlyoutSafeArea;
