import React from "react";

export type Props = {
	children?: React.ReactNode;
	targetRef?: React.RefObject<HTMLElement | ShadowRoot | null>;
};

export type ScopeProps<T extends HTMLElement> = {
	children: (ref: React.RefObject<T | null>) => React.ReactNode;
};

export type Context = {
	scopeRef: React.RefObject<HTMLElement | null>;
};
