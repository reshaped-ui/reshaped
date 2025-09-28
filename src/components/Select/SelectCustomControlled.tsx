import React from "react";
import DropdownMenu from "components/DropdownMenu";
import Icon from "components/Icon";
import CheckmarkIcon from "icons/Checkmark";
import { isMatchingComponentChildId, responsivePropDependency } from "utilities/props";
import type * as T from "./Select.types";
import SelectRoot from "./SelectRoot";
import SelectTrigger from "./SelectTrigger";

const SelectCustomControlled: React.FC<T.CustomControlledProps> = (props) => {
	const { children, value, name, placeholder, size } = props;
	const initialFocusRef = React.useRef<HTMLButtonElement>(null);

	let selectedOption: T.OptionProps | null = null;

	const traverseOptionList = (children: React.ReactNode): React.ReactNode => {
		return React.Children.map(children, (child, index) => {
			if (!React.isValidElement(child)) return null;

			if (isMatchingComponentChildId(child, "Select.Option")) {
				const component = child as React.ReactElement<T.OptionProps>;
				const option = component.props;
				const matchingValue = option.value === value;
				const selected = matchingValue || (!placeholder && !value && index === 0);

				if (selected) selectedOption = option;

				return React.cloneElement(component, {
					key: option.value,
					onClick: (e) => {
						props.onChange?.({ value: option.value, name });
						option.onClick?.(e);
					},
					startSlot: option?.startSlot || (value && <Icon svg={CheckmarkIcon} blank={!selected} />),
					attributes: {
						...component.props.attributes,
						ref: selected ? initialFocusRef : undefined,
					},
				});
			}

			if (isMatchingComponentChildId(child, "Select.OptionGroup")) {
				const component = child as React.ReactElement<T.OptionGroupProps>;
				const optionGroup = component.props;

				return React.cloneElement(component, {
					key: optionGroup.label,
					children: traverseOptionList(optionGroup.children),
				});
			}
			return null;
		});
	};

	const resolvedChildren = traverseOptionList(children);

	return (
		<SelectRoot {...props}>
			{(props) => {
				return (
					<DropdownMenu
						width="trigger"
						disableHideAnimation
						borderRadius={responsivePropDependency(size, (size) =>
							size === "large" || size === "xlarge" ? "medium" : "small"
						)}
						initialFocusRef={initialFocusRef}
					>
						<DropdownMenu.Trigger>
							{(attributes) => {
								const triggerProps = {
									...props,
									inputAttributes: {
										...props.inputAttributes,
										...attributes,
									},
								} as T.TriggerProps;

								return (
									<SelectTrigger {...triggerProps} value={selectedOption?.value || ""}>
										{value && selectedOption?.children}
									</SelectTrigger>
								);
							}}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>{resolvedChildren}</DropdownMenu.Content>
					</DropdownMenu>
				);
			}}
		</SelectRoot>
	);
};

SelectCustomControlled.displayName = "SelectCustomControlled";

export default SelectCustomControlled;
