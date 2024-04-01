"use client";

import React from "react";
import TextField from "components/TextField";
import type { TextFieldProps } from "components/TextField";
import DropdownMenu from "components/DropdownMenu";
import type { MenuItemProps } from "components/MenuItem";
import useHotkeys from "hooks/useHotkeys";
import * as keys from "constants/keys";
import * as T from "./Autocomplete.types";

const AutocompleteContext = React.createContext({} as T.Context);

const Autocomplete = (props: T.Props) => {
	const { children, onChange, onItemSelect, name, ...textFieldProps } = props;
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const [active, setActive] = React.useState(false);
	// Prevent dropdown from opening on selecting an item
	const [locked, setLocked] = React.useState(false);
	const hasChildren = !!React.Children.toArray(children).filter(Boolean).length;

	const handleOpen = React.useCallback(() => setActive(true), []);
	const handleClose = () => setActive(false);

	useHotkeys(
		{
			[`${keys.UP},${keys.DOWN}`]: () => handleOpen(),
		},
		[handleOpen],
		{ ref: inputRef, preventDefault: true }
	);

	const handleChange: TextFieldProps["onChange"] = (args) => {
		onChange?.(args);

		setLocked(false);
		handleOpen();
	};

	const handleItemClick: T.Context["onItemClick"] = (args) => {
		onChange?.({ value: args.value, name });
		onItemSelect?.({ value: args.value });
		setLocked(true);
	};

	const handleFocus: TextFieldProps["onFocus"] = (e) => {
		requestAnimationFrame(() => {
			if (!locked) return;
			setActive(false);
			setLocked(false);
		});
		textFieldProps.onFocus?.(e);
	};

	return (
		<AutocompleteContext.Provider value={{ onItemClick: handleItemClick }}>
			<DropdownMenu
				position="bottom"
				width="trigger"
				triggerType="focus"
				trapFocusMode="selection-menu"
				active={!locked && hasChildren && active}
				onClose={handleClose}
				onOpen={handleOpen}
				disableHideAnimation
			>
				<DropdownMenu.Trigger>
					{({ ref, ...attributes }) => (
						<TextField
							{...textFieldProps}
							name={name}
							onChange={handleChange}
							// Ignoring the type check since TS can't infer the correct html element type
							attributes={{ ...textFieldProps.attributes, ref } as any}
							inputAttributes={{
								...textFieldProps.inputAttributes,
								onFocus: (e) => {
									attributes.onFocus?.();
									handleFocus(e);
								},
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
	const { value, onClick, ...menuItemProps } = props;
	const { onItemClick } = React.useContext(AutocompleteContext);

	const hanleClick: MenuItemProps["onClick"] = (e) => {
		onClick?.(e);
		onItemClick({ value });
	};

	return (
		<DropdownMenu.Item
			{...menuItemProps}
			attributes={{ ...menuItemProps.attributes, role: "option" }}
			onClick={hanleClick}
		/>
	);
};

Autocomplete.Item = AutocompleteItem;
export default Autocomplete;
