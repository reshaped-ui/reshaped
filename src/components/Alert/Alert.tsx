import React from "react";
import Icon from "components/Icon";
import View from "components/View";
import Text from "components/Text";
import * as T from "./Alert.types";

const Alert = (props: T.Props) => {
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
			<View gap={1}>
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
					<Icon svg={icon} size={5} color={isNeutral ? "primary" : color} />
					<View.Item grow>{applyActions(renderContent())}</View.Item>
				</>
			) : (
				applyActions(renderContent())
			)}
		</View>
	);
};

export default Alert;
