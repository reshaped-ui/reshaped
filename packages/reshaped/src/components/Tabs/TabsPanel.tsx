"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";
import { getFocusableElements } from "@reshaped/utilities/internal";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Tabs.types";
import { useTabs } from "./TabsContext";
import s from "./Tabs.module.css";

const TabsPanel: React.FC<T.PanelProps> = (props) => {
	const { value: panelValue, children, className, attributes } = props;
	const { value, panelId, buttonId, registerPanel, unregisterPanel } = useTabs(panelValue);
	const [needsTabIndex, setNeedsTabIndex] = React.useState(true);
	const rootRef = React.useRef<HTMLDivElement>(null);
	const active = panelValue === value;
	const panelClassNames = classNames(s.panel, !active && s["panel--hidden"], className);

	useIsomorphicLayoutEffect(() => {
		registerPanel(panelValue);
		return () => unregisterPanel(panelValue);
	}, [panelValue, registerPanel, unregisterPanel]);

	React.useEffect(() => {
		const el = rootRef.current;
		if (!el) return;

		const updateTabIndex = () => {
			setNeedsTabIndex(!getFocusableElements(el).length);
		};

		updateTabIndex();

		const observer = new MutationObserver(updateTabIndex);
		observer.observe(el, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["tabindex", "disabled", "href"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div
			{...attributes}
			ref={rootRef}
			className={panelClassNames}
			tabIndex={needsTabIndex ? 0 : undefined}
			role="tabpanel"
			id={panelId}
			aria-labelledby={buttonId}
		>
			{active && children}
		</div>
	);
};

TabsPanel.displayName = "Tabs.Panel";

export default TabsPanel;
