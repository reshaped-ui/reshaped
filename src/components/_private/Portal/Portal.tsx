"use client";

import React from "react";
import ReactDOM from "react-dom";
import Theme from "components/Theme";
import type * as T from "./Portal.types";

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
	/**
	 * Check for parent portal to render inside it
	 * To avoid z-iondex issues
	 * Example:
	 * Dropdown rendered on the page should render under the modal
	 * Dropdown inside the modal should render above it
	 */
	const portal = usePortalScope();
	const nextScopeRef = targetRef || portal.scopeRef;

	/* Preserve the current theme when rendered in body */
	return ReactDOM.createPortal(<Theme>{children}</Theme>, nextScopeRef?.current || document.body);
};

function PortalScope<T extends HTMLElement>(props: T.ScopeProps<T>) {
	const { children } = props;
	const ref = React.useRef<T | null>(null);

	return (
		<PortalScopeContext.Provider value={{ scopeRef: ref }}>
			{children(ref)}
		</PortalScopeContext.Provider>
	);
}

Portal.Scope = PortalScope;
export default Portal;
