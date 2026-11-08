"use client";

import React from "react";

/**
 * Element of the parent Badge.Container.
 * Badge reports its size to it for the cutout since css can't read the size of a sibling element.
 */
const BadgeContainerContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(
	null
);

export default BadgeContainerContext;
