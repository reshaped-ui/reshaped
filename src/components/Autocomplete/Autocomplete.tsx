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
import s from "./Autocomplete.module.css";

const AutocompleteContext = React.createContext({} as T.Context);

const Autocomplete: React.FC<T.Props> & { Item: typeof AutocompleteItem } = (props) => {
	const {
		children,
		onChange,
		onInput,
		onItemSelect,
		name,
		containerRef,
		instanceRef,
		onBackspace,
		active,
		onOpen,
		onClose,
		...textFieldProps
	} = props;
	const onBackspaceRef = useHandlerRef(onBackspace);
	const internalInputRef = React.useRef<HTMLInputElement>(null);
	const inputAttributesRef = textFieldProps.inputAttributes?.ref;
	const inputRef =
		inputAttributesRef && typeof inputAttributesRef !== "string" && "current" in inputAttributesRef
			? inputAttributesRef
			: internalInputRef;
	const [internalActive, setInternalActive] = React.useState(false);
	const hasChildren = !!React.Children.toArray(children).filter(Boolean).length;
	const lockedRef = React.useRef(false);
	const onOpenRef = useHandlerRef(onOpen);
	const onCloseRef = useHandlerRef(onClose);
	const isDropdownActive = hasChildren && (active ?? internalActive);

	const lockDropdown = () => {
		// Prevent dropdown from re-opening when clicked on item with mouse
		// and focus moves to the item and back to the input
		lockedRef.current = true;
		setTimeout(() => {
			lockedRef.current = false;
		}, 100);
	};

	const handleOpen = React.useCallback(() => {
		if (lockedRef.current) return;
		setInternalActive(true);
		onOpenRef.current?.();
	}, [onOpenRef]);

	const handleClose: T.Props["onClose"] = (args) => {
		setInternalActive(false);
		onCloseRef.current?.(args);
	};

	const handleItemClick: T.Context["onItemClick"] = (args) => {
		onChange?.({ value: args.value, name });
		onItemSelect?.(args);
		lockDropdown();
	};

	const handleChange: TextFieldProps["onChange"] = (args) => {
		onChange?.(args);
		handleOpen();
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInput?.({ value: e.currentTarget.value, name, event: e });
		textFieldProps.inputAttributes?.onInput?.(e);
	};

	/**
	 * Make sure focus stays on the input even after user clicks on the content
	 * but outside the items
	 */
	const handleContentClick = () => {
		// Prevent the content from being selected
		lockDropdown();
		inputRef.current?.focus();
	};

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

	return (
		<AutocompleteContext.Provider value={{ onItemClick: handleItemClick }}>
			<DropdownMenu
				position="bottom"
				width="trigger"
				triggerType="focus"
				trapFocusMode="selection-menu"
				active={isDropdownActive}
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
							focused={isDropdownActive}
							attributes={{
								...textFieldProps.attributes,
								// Ignoring the type check since TS can't infer the correct html element type
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								ref: ref as any,
								onClick: attributes.onFocus,
							}}
							inputAttributes={{
								...textFieldProps.inputAttributes,
								...attributes,
								onFocus: (e) => {
									attributes.onFocus?.();
									textFieldProps.onFocus?.(e);
									// Only select the value when user clicks on the input
									if (!lockedRef.current) inputRef.current?.select();
								},
								onInput: handleInput,
								onClick: attributes.onFocus,
								ref: inputRef,
								role: "combobox",
							}}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content attributes={{ onClick: handleContentClick }}>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu>
		</AutocompleteContext.Provider>
	);
};

const AutocompleteItem: React.FC<T.ItemProps> = (props) => {
	const { value, data, onClick, ...menuItemProps } = props;
	const { onItemClick } = React.useContext(AutocompleteContext);

	const handleClick: MenuItemProps["onClick"] = (e) => {
		onClick?.(e);
		onItemClick({ value, data });
	};

	return (
		<DropdownMenu.Item
			{...menuItemProps}
			className={[menuItemProps.disabled && s["item--disabled"], menuItemProps.className]}
			attributes={{
				...menuItemProps.attributes,
				role: "option",
			}}
			onClick={handleClick}
		/>
	);
};

Autocomplete.Item = AutocompleteItem;

Autocomplete.displayName = "Autocomplete";
AutocompleteItem.displayName = "Autocomplete.Item";

export default Autocomplete;
