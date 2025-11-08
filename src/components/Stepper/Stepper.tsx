import React from "react";

import Expandable from "components/_private/Expandable";
import Divider from "components/Divider";
import Hidden from "components/Hidden";
import Icon from "components/Icon";
import Text from "components/Text";
import View from "components/View";
import IconCheckmark from "icons/Checkmark";
import { responsivePropDependency } from "utilities/props";

import s from "./Stepper.module.css";

import type * as T from "./Stepper.types";

const StepperItemPrivate: React.FC<T.ItemPrivateProps> = (props) => {
	const {
		title,
		subtitle,
		children,
		direction,
		className,
		attributes,
		labelDisplay,
		step,
		completed,
		active,
		last,
	} = props;
	const labelHidden =
		labelDisplay && responsivePropDependency(labelDisplay, (value) => value === "hidden");

	const labelNode = (
		<View gap={3} grow>
			<View.Item>
				<Text variant="body-3" weight="medium">
					{title}
				</Text>
				<Text variant="caption-1" color="neutral-faded">
					{subtitle}
				</Text>
			</View.Item>
		</View>
	);

	return (
		<View attributes={attributes} className={className}>
			<View direction="row" gap={2} align="center" position="static">
				<View.Item>
					<View
						align="center"
						justify="center"
						backgroundColor={active || completed ? "primary" : "neutral-faded"}
						borderColor={active || completed ? undefined : "neutral-faded"}
						borderRadius="circular"
						as="span"
						width={8}
						height={8}
						zIndex={5}
					>
						<Text variant="body-3" weight={active ? "bold" : "medium"}>
							{completed ? <Icon svg={IconCheckmark} size={4} /> : step}
						</Text>
					</View>
					{direction === "column" && !last && <Divider vertical className={s.verticalDivider} />}
				</View.Item>
				{labelDisplay ? <Hidden hide={labelHidden}>{labelNode}</Hidden> : labelNode}
			</View>
			{direction === "column" && children && (
				<Expandable active={active}>
					<View paddingStart={10} paddingTop={2}>
						{children}
					</View>
				</Expandable>
			)}
		</View>
	);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StepperItem = (_: T.ItemProps) => null;

const Stepper: React.FC<T.Props> = (props) => {
	const {
		children,
		direction = "row",
		activeId,
		labelDisplay,
		gap = 3,
		className,
		attributes,
	} = props;
	const vertical = direction === "column";
	const length = React.Children.count(children);

	return (
		<View
			attributes={attributes}
			direction={direction}
			align={vertical ? "stretch" : "center"}
			className={className}
			gap={gap}
			wrap={false}
		>
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) return null;
				if (child.type !== StepperItem) return null;

				const props = child.props as T.ItemProps;
				const itemId = props.id || `${index}`;

				return (
					<React.Fragment key={index}>
						<StepperItemPrivate
							{...props}
							id={itemId}
							active={activeId?.toString() === itemId}
							step={index + 1}
							last={index === length - 1}
							direction={direction}
							labelDisplay={labelDisplay}
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

Stepper.displayName = "Stepper";
StepperItem.displayName = "Stepper.Item";

export default Stepper;
