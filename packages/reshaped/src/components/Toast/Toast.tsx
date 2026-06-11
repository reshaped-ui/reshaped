"use client";

import React from "react";

import Button, { type ButtonProps } from "@/components/Button";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import View, { type ViewProps } from "@/components/View";
import type * as T from "./Toast.types";
import s from "./Toast.module.css";

const Toast: React.FC<T.Props & { collapsed: boolean }> = (props) => {
	const {
		text,
		children,
		color = "neutral",
		orientation = "horizontal",
		icon,
		title,
		actionsSlot,
		startSlot,
		className,
		attributes,
	} = props;
	const isVertical = orientation === "vertical";
	const backgroundColor: ViewProps["backgroundColor"] =
		color === "neutral" ? "elevation-overlay" : color;
	const borderColor = color === "neutral" ? "neutral-faded" : "transparent";
	let actions = [];

	if (actionsSlot) {
		actions = Array.isArray(actionsSlot) ? actionsSlot : [actionsSlot];
	}

	const textContent = (title || text) && (
		<React.Fragment>
			{title && (
				<Text variant="body-2" weight="semibold" as="h3">
					{title}
				</Text>
			)}
			<Text
				variant="body-2"
				as="p"
				color={color === "neutral" && title ? "neutral-faded" : undefined}
			>
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
			align={isVertical || title ? "start" : "center"}
			className={className}
			attributes={attributes}
		>
			{icon && <Icon size={5} svg={icon} className={s.icon} />}
			{startSlot && !icon && <View.Item>{startSlot}</View.Item>}

			<View.Item grow>
				<View
					direction={isVertical ? "column" : "row"}
					align={isVertical ? "start" : "center"}
					gap={3}
				>
					<View.Item grow>
						{textContent && children ? (
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
								const defaultProps: Partial<ButtonProps> = {
									variant: "ghost",
									size: "small",
									color: "inherit",
								};

								if (slot.type === Button) {
									if (index === 0) {
										return (
											<Button.Aligner side={index === 0 ? "start" : "end"} key={index}>
												<Button {...defaultProps} {...slot.props} />
											</Button.Aligner>
										);
									}

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

	return toastNode;
};

Toast.displayName = "Toast";

export default Toast;
