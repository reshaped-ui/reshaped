import React from "react";
import Expandable from "components/_private/Expandable";
import View from "components/View";
import Text from "components/Text";
import Divider from "components/Divider";
import Icon from "components/Icon";
import IconCheckmark from "icons/Checkmark";
import type * as T from "./Stepper.types";

const StepperItemPrivate = (props: T.ItemPrivateProps) => {
	const {
		title,
		subtitle,
		children,
		direction,
		className,
		attributes,
		step,
		completed,
		active,
		last,
	} = props;

	return (
		<View>
			<View attributes={attributes} className={className} direction="row" gap={2} align="center">
				<View
					align="center"
					justify="center"
					backgroundColor={active || completed ? "primary" : "neutral-faded"}
					borderColor={active || completed ? undefined : "neutral-faded"}
					borderRadius="circular"
					as="span"
					width={8}
					height={8}
				>
					<Text variant="body-3" weight={active ? "bold" : "medium"}>
						{completed ? <Icon svg={IconCheckmark} size={4} /> : step}
					</Text>
				</View>
				<View gap={3}>
					<View.Item>
						<Text variant="body-3" weight="medium">
							{title}
						</Text>
						<Text variant="caption-1" color="neutral-faded">
							{subtitle}
						</Text>
					</View.Item>
				</View>
			</View>
			{direction === "column" && (
				<Expandable active={active}>
					<View paddingStart={10} paddingTop={2}>
						{children}
					</View>
				</Expandable>
			)}
			{direction === "column" && !last && (
				<View paddingStart={4} position="absolute" insetTop={10} insetBottom={0}>
					<Divider vertical blank />
				</View>
			)}
		</View>
	);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StepperItem = (_: T.ItemProps) => null;

const Stepper = (props: T.Props) => {
	const { children, direction = "row", activeId, className, attributes } = props;
	const vertical = direction === "column";
	const length = React.Children.count(children);

	return (
		<View
			attributes={attributes}
			direction={direction}
			align={vertical ? "start" : "center"}
			className={className}
			gap={3}
		>
			{React.Children.map(children, (child: any, index) => {
				const itemId = child.props.id || `${index}`;

				return (
					<React.Fragment key={index}>
						<StepperItemPrivate
							{...child.props}
							id={child.props.id || `${index}`}
							active={activeId === itemId}
							step={index + 1}
							last={index === length - 1}
							direction={direction}
						/>

						{!vertical && index < length - 1 && (
							<View grow>
								<Divider />
							</View>
						)}
					</React.Fragment>
				);
			})}
		</View>
	);
};

Stepper.Item = StepperItem;
export default Stepper;
