"use client";

import React from "react";
import ReactDOM from "react-dom";
import Theme from "components/Theme";
import type * as T from "./Portal.types";

const PortalContext = React.createContext<T.Context>({ scopeRef: undefined });

export const usePortal = () => {
	return React.useContext(PortalContext);
};

/**
 * Disclaimer: Works only for components that don't show the portal immediately
 * That gives Portal time to receive scope on first render
 */
const PortalProvider = (props: T.Props): JSX.Element => {
	const { children, scopeRef } = props;
	const portal = usePortal();
	const nextScopeRef = scopeRef || portal.scopeRef;

	return ReactDOM.createPortal(
		<PortalContext.Provider value={{ scopeRef: nextScopeRef }}>
			{/* Preserve the current theme when rendered in body */}
			<Theme>{children}</Theme>
		</PortalContext.Provider>,
		portal.scopeRef?.current || document.body
	);
};

export default PortalProvider;
