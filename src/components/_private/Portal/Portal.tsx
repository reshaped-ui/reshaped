"use client";

import React from "react";
import ReactDOM from "react-dom";
import Theme from "components/Theme";
import { getShadowRoot } from "utilities/dom";
import type * as T from "./Portal.types";
import s from "./Portal.module.css";

const PortalScopeContext = React.createContext<T.Context>({} as T.Context);

export const usePortalScope = () => {
	return React.useContext(PortalScopeContext);
};

/**
 * Disclaimer: Works only for components that don't show the portal immediately
 * That gives Portal time to receive scope on first render
 */
const Portal = (props: T.Props): any => {
	const { children, targetRef } = props;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const shadowRoot = getShadowRoot(rootRef.current);
	const defaultTargetEl = shadowRoot ?? document.body;

	/**
	 * Check for parent portal to render inside it
	 * To avoid z-iondex issues
	 * Example:
	 * Dropdown rendered on the page should render under the modal
	 * Dropdown inside the modal should render above it
	 */
	const portal = usePortalScope();
	const nextScopeRef = targetRef || portal.scopeRef;
	const targetEl = nextScopeRef?.current || defaultTargetEl;

	/* Preserve the current theme when rendered in body */
	return (
		<>
			{ReactDOM.createPortal(<Theme>{children}</Theme>, targetEl)}
			<div ref={rootRef} className={s.root} />
		</>
	);
};

function PortalScope<T extends HTMLElement>(props: T.ScopeProps<T>) {
	const { children } = props;
	const ref = React.useRef<T>(null);

	return (
		<PortalScopeContext.Provider value={{ scopeRef: ref }}>
			{children(ref)}
		</PortalScopeContext.Provider>
	);
}

Portal.Scope = PortalScope;
export default Portal;
