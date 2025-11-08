"use client";

import React from "react";

import Actionable from "components/Actionable";
import Icon from "components/Icon";
import View from "components/View";
import IconChevronDown from "icons/ChevronDown";
import { classNames } from "utilities/props";

import AccordionContext from "./Accordion.context";
import s from "./Accordion.module.css";
import * as T from "./Accordion.types";

const AccordionTrigger: React.FC<T.TriggerProps> = (props) => {
	const { children } = props;
	const {
		active,
		onToggle,
		triggerId,
		contentId,
		iconPosition = "end",
		iconSize,
	} = React.useContext(AccordionContext);
	const iconClassNames = classNames(s.icon, active && s["icon--active"]);

	const handleClick = () => {
		onToggle?.(!active);
	};

	const attributes = { "aria-expanded": active, "aria-controls": contentId, id: triggerId };

	if (typeof children === "function") {
		return <>{children({ ...attributes, onClick: handleClick }, { active })}</>;
	}

	return (
		<Actionable onClick={handleClick} fullWidth attributes={attributes}>
			<View gap={2} direction={iconPosition === "start" ? "row-reverse" : "row"} align="center">
				<View.Item grow>{children}</View.Item>
				<Icon size={iconSize || 4} svg={IconChevronDown} className={iconClassNames} />
			</View>
		</Actionable>
	);
};

AccordionTrigger.displayName = "Accordion.Trigger";

export default AccordionTrigger;
