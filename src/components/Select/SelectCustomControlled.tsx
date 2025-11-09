"use client";

import React from "react";

import DropdownMenu from "components/DropdownMenu";
import Icon from "components/Icon";
import View from "components/View";
import CheckmarkIcon from "icons/Checkmark";
import { responsivePropDependency } from "utilities/props";

import SelectGroup from "./SelectGroup";
import SelectOption from "./SelectOption";
import SelectRoot from "./SelectRoot";
import SelectTrigger from "./SelectTrigger";

import type * as T from "./Select.types";

const SelectCustomControlled: React.FC<T.CustomControlledProps> = (props) => {
	const {
		children,
		value,
		name,
		placeholder,
		size,
		multiple,
		width = "trigger",
		position,
		fallbackPositions,
		positionRef,
		renderValue: passedRenderValue,
	} = props;
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

			if (child.type === SelectOption) {
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
						option?.startSlot !== undefined
							? option.startSlot
							: hasValue && <Icon svg={selected ? CheckmarkIcon : null} />,
					attributes: {
						...component.props.attributes,
						ref: selected ? initialFocusRef : undefined,
					},
				});
			}

			if (child.type === SelectGroup) {
				const component = child as React.ReactElement<T.GroupProps>;
				const group = component.props;

				return React.cloneElement(component, {
					key: group.label ?? index,
					children: traverseOptionList(group.children),
				});
			}

			return child;
		});
	};

	// eslint-disable-next-line react-hooks/refs
	const resolvedChildren = traverseOptionList(children);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const key = e.key;

		// Ignore search when user is typing, e.g. if there is a filter input inside the dropdown
		if (document.activeElement?.tagName === "INPUT") return;
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

	const renderValue = () => {
		if (passedRenderValue) {
			// Returning the same call for correct type inference
			if (multiple) return passedRenderValue({ value });
			return passedRenderValue({ value });
		}

		if (selectedOptions.length === 1) return selectedOptions[0].children;
		if (selectedOptions.length > 1) {
			return (
				<View direction="row" gap={4}>
					{selectedOptions.map((option) => (
						<View.Item key={option.value}>{option.children}</View.Item>
					))}
				</View>
			);
		}

		return null;
	};

	return (
		<SelectRoot {...props}>
			{(props) => {
				return (
					<DropdownMenu
						width={width}
						disableHideAnimation
						position={position ?? "bottom"}
						fallbackPositions={fallbackPositions ?? (position ? undefined : ["bottom", "top"])}
						fallbackAdjustLayout
						fallbackMinHeight="220px"
						borderRadius={responsivePropDependency(size, (size) =>
							size === "large" || size === "xlarge" ? "medium" : "small"
						)}
						initialFocusRef={initialFocusRef}
						positionRef={positionRef}
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
										{renderValue()}
									</SelectTrigger>
								);
							}}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							attributes={{
								ref: dropdownRef,
								onKeyDown: handleKeyDown,
								// Ignore the default menu role since we're using options
								role: undefined,
							}}
						>
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
