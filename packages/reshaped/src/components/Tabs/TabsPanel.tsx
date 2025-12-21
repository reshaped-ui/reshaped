"use client";

import React from "react";

import { getFocusableElements } from "utilities/a11y";
import { classNames } from "utilities/props";

import s from "./Tabs.module.css";
import { useTabs } from "./TabsContext";

import type * as T from "./Tabs.types";

const TabsPanel: React.FC<T.PanelProps> = (props) => {
	const { value: panelValue, children, className, attributes } = props;
	const { value, panelId, buttonId } = useTabs(panelValue);
	const [needsTabIndex, setNeedsTabIndex] = React.useState(true);
	const rootRef = React.useRef<HTMLDivElement>(null);
	const active = panelValue === value;
	const panelClassNames = classNames(s.panel, !active && s["panel--hidden"], className);

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
