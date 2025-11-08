"use client";

import React from "react";

import Button, { type ButtonProps } from "components/Button";
import Icon from "components/Icon";
import Text from "components/Text";
import Theme from "components/Theme";
import View, { type ViewProps } from "components/View";

import s from "./Toast.module.css";

import type * as T from "./Toast.types";

const Toast: React.FC<T.Props & { collapsed: boolean }> = (props) => {
	const {
		size = "small",
		text,
		children,
		color = "inverted",
		icon,
		title,
		actionsSlot,
		startSlot,
		collapsed,
		className,
		attributes,
	} = props;
	let backgroundColor: ViewProps["backgroundColor"] =
		color === "inverted" || color === "neutral" ? "elevation-overlay" : color;
	if (color === "neutral") backgroundColor = collapsed ? "neutral" : "elevation-overlay";
	const borderColor = color === "neutral" ? "neutral-faded" : "transparent";
	const textTagName = size === "small" ? "span" : "div";
	const isLarge = size === "large";
	let actions = [];

	if (actionsSlot) {
		actions = Array.isArray(actionsSlot) ? actionsSlot : [actionsSlot];
	}

	const textContent = (title || text) && (
		<React.Fragment>
			{title && (
				<Text variant="body-3" weight="bold" as={textTagName}>
					{title}{" "}
				</Text>
			)}
			<Text variant="body-3" as={textTagName}>
				{text}
			</Text>
		</React.Fragment>
	);

	const toastNode = (
		<View
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			padding={4}
			borderRadius="medium"
			animated
			direction="row"
			gap={3}
			align={isLarge ? "start" : "center"}
			className={[s.toast, className]}
			attributes={attributes}
		>
			{icon && <Icon size={5} svg={icon} className={s.icon} />}
			{startSlot && !icon && <View.Item>{startSlot}</View.Item>}

			<View.Item grow>
				<View direction={isLarge ? "column" : "row"} align={isLarge ? "start" : "center"} gap={3}>
					<View.Item grow>
						{(textContent && children) || size !== "small" ? (
							<View gap={0.5}>
								{textContent}
								{children && <View gap={3}>{children}</View>}
							</View>
						) : (
							textContent || children
						)}
					</View.Item>

					{actions.length && (
						<View direction="row" align="center" gap={2}>
							{actions.map((slot, index) => {
								const isPrimary = size === "large" ? index === 0 : index === actions.length - 1;
								const primaryColor =
									color === "neutral" || color === "inverted" ? "neutral" : "media";
								const defaultProps: Partial<ButtonProps> = {
									variant: isPrimary ? "solid" : "ghost",
									size: "small",
									color: isPrimary ? primaryColor : "inherit",
									elevated: color !== "neutral",
								};

								if (slot.type === Button) {
									return <Button {...defaultProps} {...slot.props} key={index} />;
								} else {
									return slot;
								}
							})}
						</View>
					)}
				</View>
			</View.Item>
		</View>
	);

	if (color === "inverted") {
		return <Theme colorMode="inverted">{toastNode}</Theme>;
	}

	return toastNode;
};

Toast.displayName = "Toast";

export default Toast;
