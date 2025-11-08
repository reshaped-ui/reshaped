import React from "react";

import Icon from "components/Icon";
import Text from "components/Text";
import View from "components/View";

import s from "./Alert.module.css";
import * as T from "./Alert.types";

const Alert: React.FC<T.Props> = (props) => {
	const {
		title,
		children,
		icon,
		actionsSlot,
		color = "neutral",
		inline,
		bleed,
		className,
		attributes,
	} = props;
	const isNeutral = color === "neutral";

	const renderContent = () => {
		if (inline) {
			return (
				<>
					{title && (
						<Text variant="body-3" weight="medium" as="span">
							{title}
						</Text>
					)}
					{title && children && " "}
					{children && (
						<Text variant="body-3" as="span">
							{children}
						</Text>
					)}
				</>
			);
		}

		return (
			<View gap={1} grow>
				{title && (
					<Text variant="body-3" weight="medium">
						{title}
					</Text>
				)}
				{children && <Text variant="body-3">{children}</Text>}
			</View>
		);
	};

	const applyActions = (content: React.ReactNode) => {
		if (!actionsSlot) return content;

		return (
			<View gap={inline ? 4 : 2} direction={inline ? "row" : "column"}>
				{inline ? <View.Item grow>{content}</View.Item> : content}
				{actionsSlot && (
					<Text variant="body-3" weight="medium">
						<View direction="row" gap={3}>
							{actionsSlot}
						</View>
					</Text>
				)}
			</View>
		);
	};

	return (
		<View
			direction="row"
			gap={3}
			padding={4}
			bleed={bleed}
			borderRadius="medium"
			borderColor={`${color}-faded`}
			backgroundColor={`${color}-faded`}
			className={className}
			attributes={{
				...attributes,
				role: color === "critical" ? "alert" : "status",
			}}
		>
			{icon ? (
				<>
					<div className={s.icon}>
						<Icon svg={icon} size={5} color={isNeutral ? "primary" : color} />
					</div>
					<View.Item grow>{applyActions(renderContent())}</View.Item>
				</>
			) : (
				applyActions(renderContent())
			)}
		</View>
	);
};

Alert.displayName = "Alert";

export default Alert;
