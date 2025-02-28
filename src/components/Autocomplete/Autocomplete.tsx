"use client";

import React from "react";
import TextField from "components/TextField";
import type { TextFieldProps } from "components/TextField";
import DropdownMenu from "components/DropdownMenu";
import type { MenuItemProps } from "components/MenuItem";
import { getActiveElement } from "utilities/a11y";
import * as keys from "constants/keys";
import useHotkeys from "hooks/useHotkeys";
import useHandlerRef from "hooks/useHandlerRef";
import * as T from "./Autocomplete.types";

const AutocompleteContext = React.createContext({} as T.Context);

const Autocomplete = (props: T.Props) => {
	const {
		children,
		onChange,
		onInput,
		onItemSelect,
		name,
		containerRef,
		instanceRef,
		onBackspace,
		...textFieldProps
	} = props;
	const onBackspaceRef = useHandlerRef(onBackspace);
	const internalInputRef = React.useRef<HTMLInputElement>(null);
	const inputAttributesRef = textFieldProps.inputAttributes?.ref;
	const inputRef =
		inputAttributesRef && typeof inputAttributesRef !== "string" && "current" in inputAttributesRef
			? inputAttributesRef
			: internalInputRef;
	const [active, setActive] = React.useState(false);
	const hasChildren = !!React.Children.toArray(children).filter(Boolean).length;
	const lockedRef = React.useRef(false);

	const handleOpen = React.useCallback(() => {
		if (lockedRef.current) return;
		setActive(true);
	}, []);
	const handleClose = () => setActive(false);

	useHotkeys(
		{
			[keys.BACKSPACE]: () => {
				onBackspaceRef.current?.();
			},
		},
		[onBackspaceRef],
		{
			ref: inputRef,
			disabled: !onBackspaceRef.current,
		}
	);

	useHotkeys(
		{
			[keys.DOWN]: () => {
				handleOpen();
			},
			[keys.ENTER]: () => {
				const el = getActiveElement(inputRef.current);
				el?.click();
			},
		},
		[handleOpen],
		{ ref: inputRef, preventDefault: true }
	);

	const handleChange: TextFieldProps["onChange"] = (args) => {
		onChange?.(args);
		handleOpen();
	};

	const handleItemClick: T.Context["onItemClick"] = (args) => {
		onChange?.({ value: args.value, name });
		onItemSelect?.(args);

		// Prevent dropdown from re-opening when clicked on item with mouse
		// and focus moves to the item and back to the input
		lockedRef.current = true;
		setTimeout(() => (lockedRef.current = false), 100);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInput?.({ value: e.currentTarget.value, name, event: e });
		textFieldProps.inputAttributes?.onInput?.(e);
	};

	return (
		<AutocompleteContext.Provider value={{ onItemClick: handleItemClick }}>
			<DropdownMenu
				position="bottom"
				width="trigger"
				triggerType="focus"
				trapFocusMode="selection-menu"
				active={hasChildren && active}
				onClose={handleClose}
				onOpen={handleOpen}
				containerRef={containerRef}
				disableHideAnimation
				instanceRef={instanceRef}
			>
				<DropdownMenu.Trigger>
					{({ ref, ...attributes }) => (
						<TextField
							{...textFieldProps}
							name={name}
							onChange={handleChange}
							focused={hasChildren && active}
							// Ignoring the type check since TS can't infer the correct html element type
							attributes={{
								...textFieldProps.attributes,
								ref: ref as any,
								onClick: attributes.onFocus,
							}}
							inputAttributes={{
								...textFieldProps.inputAttributes,
								...attributes,
								onFocus: (e) => {
									attributes.onFocus?.();
									textFieldProps.onFocus?.(e);
								},
								onInput: handleInput,
								onClick: attributes.onFocus,
								ref: inputRef,
								role: "combobox",
							}}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>{children}</DropdownMenu.Content>
			</DropdownMenu>
		</AutocompleteContext.Provider>
	);
};

const AutocompleteItem = (props: T.ItemProps) => {
	const { value, data, onClick, ...menuItemProps } = props;
	const { onItemClick } = React.useContext(AutocompleteContext);

	const handleClick: MenuItemProps["onClick"] = (e) => {
		onClick?.(e);
		onItemClick({ value, data });
	};

	return (
		<DropdownMenu.Item
			{...menuItemProps}
			attributes={{ ...menuItemProps.attributes, role: "option" }}
			onClick={handleClick}
		/>
	);
};

Autocomplete.Item = AutocompleteItem;
export default Autocomplete;
