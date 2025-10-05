import React from "react";
import DropdownMenu from "components/DropdownMenu";
import Icon from "components/Icon";
import CheckmarkIcon from "icons/Checkmark";
import { isMatchingComponentChildId, responsivePropDependency } from "utilities/props";
import type * as T from "./Select.types";
import SelectRoot from "./SelectRoot";
import SelectTrigger from "./SelectTrigger";

const SelectCustomControlled: React.FC<T.CustomControlledProps> = (props) => {
	const { children, value, name, placeholder, size, multiple } = props;
	const initialFocusRef = React.useRef<HTMLButtonElement>(null);
	const searchStringRef = React.useRef<string>("");
	const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const indexedOptions: Array<{ value: string; text: string }> = [];
	const selectedOptions: T.OptionProps[] = [];
	const hasValue = multiple ? value.length > 0 : value;

	const traverseOptionList = (children: React.ReactNode): React.ReactNode => {
		return React.Children.map(children, (child, index) => {
			if (!React.isValidElement(child)) return null;

			if (isMatchingComponentChildId(child, "Select.Option")) {
				const component = child as React.ReactElement<T.OptionProps>;
				const option = component.props;
				const matchingValue = multiple ? value.includes(option.value) : option.value === value;
				const selected = matchingValue || (!placeholder && !value && index === 0);

				if (selected) selectedOptions.push(option);

				indexedOptions.push({
					value: option.value,
					text: typeof option.children === "string" ? option.children : option.value,
				});

				return React.cloneElement(component, {
					key: option.value,
					onClick: (e) => {
						option.onClick?.(e);
						if (multiple) {
							const nextValue = selected
								? value.filter((v) => v !== option.value)
								: [...value, option.value];

							props.onChange?.({ value: nextValue, name });
						} else {
							props.onChange?.({ value: option.value, name });
						}
					},
					startSlot:
						option?.startSlot || (hasValue && <Icon svg={selected ? CheckmarkIcon : null} />),
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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const key = e.key;

		// Only handle alphanumeric and space characters for type-ahead
		if (key.length !== 1 || !key.match(/[\w\s]/)) return;

		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

		searchStringRef.current += key.toLowerCase();

		const matchingOption = indexedOptions.find((option) =>
			option.text.toLowerCase().startsWith(searchStringRef.current)
		);

		if (matchingOption && dropdownRef.current) {
			const button = dropdownRef.current.querySelector<HTMLButtonElement>(
				`[value="${matchingOption.value}"]`
			);

			button?.focus();
		}

		searchTimeoutRef.current = setTimeout(() => {
			searchStringRef.current = "";
		}, 1000);
	};

	return (
		<SelectRoot {...props}>
			{(props) => {
				return (
					<DropdownMenu
						width="trigger"
						disableHideAnimation
						position="bottom"
						fallbackPositions={["bottom", "top"]}
						fallbackAdjustLayout
						fallbackMinHeight="150px"
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
									<SelectTrigger {...triggerProps} value={value}>
										{selectedOptions?.map((option) => option.children).join(", ")}
									</SelectTrigger>
								);
							}}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content attributes={{ ref: dropdownRef, onKeyDown: handleKeyDown }}>
							{resolvedChildren}
						</DropdownMenu.Content>
					</DropdownMenu>
				);
			}}
		</SelectRoot>
	);
};

SelectCustomControlled.displayName = "SelectCustomControlled";

export default SelectCustomControlled;
