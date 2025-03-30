"use client";

import { classNames } from "utilities/helpers";
import { useTabs } from "./TabsContext";
import type * as T from "./Tabs.types";
import s from "./Tabs.module.css";

const TabsPanel = (props: T.PanelProps) => {
	const { value: panelValue, children, className, attributes } = props;
	const { value, panelId, buttonId } = useTabs(panelValue);
	const active = panelValue === value;
	const panelClassNames = classNames(s.panel, !active && s["--panel-hidden"], className);

	return (
		<div
			{...attributes}
			className={panelClassNames}
			tabIndex={0}
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
