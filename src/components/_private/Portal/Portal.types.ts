import React from "react";

export type Props = {
	children?: React.ReactNode;
	scopeRef?: React.RefObject<HTMLElement | null>;
};

export type Context = Pick<Props, "scopeRef">;
