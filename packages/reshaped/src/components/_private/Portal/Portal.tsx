"use client";

import React from "react";
import ReactDOM from "react-dom";

import Theme from "components/Theme";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useToggle from "hooks/useToggle";

import s from "./Portal.module.css";

import type * as T from "./Portal.types";

const PortalScopeContext = React.createContext<T.Context>({} as T.Context);

export const usePortalScope = () => {
	return React.useContext(PortalScopeContext);
};

/**
 * Disclaimer: Works only for components that don't show the portal immediately
 * That gives Portal time to receive scope on first render
 */
const Portal: React.FC<T.Props> = (props) => {
	const { children, targetRef } = props;
	const mountedToggle = useToggle();
	const rootRef = React.useRef<HTMLDivElement>(null);
	// eslint-disable-next-line react-hooks/refs
	const rootNode = rootRef.current?.getRootNode();
	const isShadowDom = rootNode instanceof ShadowRoot;
	const defaultTargetEl = isShadowDom ? rootNode : document.body;

	/**
	 * Check for parent portal to render inside it
	 * To avoid z-index issues
	 * Example:
	 * Dropdown rendered on the page should render under the modal
	 * Dropdown inside the modal should render above it
	 */
	const portal = usePortalScope();
	const nextScopeRef = targetRef || portal.scopeRef;
	// eslint-disable-next-line react-hooks/refs
	const targetEl = nextScopeRef?.current || defaultTargetEl;

	useIsomorphicLayoutEffect(() => {
		mountedToggle.activate();
		return () => mountedToggle.deactivate();
	}, []);

	/* Preserve the current theme when rendered in body */
	return [
		// eslint-disable-next-line react-hooks/refs
		ReactDOM.createPortal(<Theme>{children}</Theme>, targetEl),
		// Make sure this element doesn't affect components using :last-child when their children use portals
		!mountedToggle.active && <div ref={rootRef} className={s.root} key="root" />,
	];
};

export function PortalScope(props: T.ScopeProps<HTMLDivElement>): React.ReactNode {
	const { children } = props;
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<PortalScopeContext.Provider value={{ scopeRef: ref }}>
			{children(ref)}
		</PortalScopeContext.Provider>
	);
}

Portal.displayName = "Portal";
PortalScope.displayName = "PortalScope";

export default Portal;
