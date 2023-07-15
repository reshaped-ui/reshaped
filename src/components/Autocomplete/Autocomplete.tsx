"use client";

import React from "react";
import TextField from "components/TextField";
import type { TextFieldProps } from "components/TextField";
import DropdownMenu from "components/DropdownMenu";
import type { MenuItemProps } from "components/MenuItem";
import * as T from "./Autocomplete.types";

const AutocompleteContext = React.createContext({} as T.Context);

const Autocomplete = (props: T.Props) => {
	const { children, onChange, name, ...textFieldProps } = props;
	const [active, setActive] = React.useState(false);
	const hasChildren = !!React.Children.count(children);

	const handleChange: TextFieldProps["onChange"] = (args) => {
		onChange?.(args);
		setActive(true);
	};

	const handleItemClick: T.Context["onItemClick"] = (args) => {
		onChange?.({ value: args.value, name });
	};

	const handleOpen = () => setActive(true);
	const handleClose = () => setActive(false);

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
				disableHideAnimation
			>
				<DropdownMenu.Trigger>
					{({ ref, ...attributes }) => (
						<TextField
							{...textFieldProps}
							name={name}
							onChange={handleChange}
							// Ignoring the type check since TS can't infer the correct html element type
							attributes={{ ref } as any}
							inputAttributes={{
								...attributes,
								role: "combobox",
							}}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content attributes={{ role: "listbox" }}>{children}</DropdownMenu.Content>
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
