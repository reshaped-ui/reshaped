"use client";

import React from "react";

/**
 * Container element of Badge.Container with cutout enabled.
 * Badge reports its size to it since css can't read the size of a sibling element.
 */
const BadgeCutoutContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export default BadgeCutoutContext;
