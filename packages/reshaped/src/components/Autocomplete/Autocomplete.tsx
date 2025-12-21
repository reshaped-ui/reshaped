"use client";

import React from "react";

import DropdownMenu from "components/DropdownMenu";
import TextField from "components/TextField";
import * as keys from "constants/keys";
import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import useHotkeys from "hooks/useHotkeys";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

import s from "./Autocomplete.module.css";
import * as T from "./Autocomplete.types";

import type { MenuItemProps } from "components/MenuItem";
import type { TextFieldProps } from "components/TextField";

const AutocompleteContext = React.createContext({} as T.Context);

const Autocomplete: React.FC<T.Props> = (props) => {
	const {
		children,
		onChange,
		onInput,
		onItemSelect,
		name,
		containerRef,
		instanceRef,
		onBackspace,
		onEnter,
		active,
		onOpen,
		onClose,
		fallbackAdjustLayout,
		fallbackMinWidth,
		fallbackMinHeight,
		contentMaxHeight,
		...textFieldProps
	} = props;
	const [highlightedId, setHighlightedId] = React.useState<string>();
	const onBackspaceRef = useHandlerRef(onBackspace);
	const contentRef = React.useRef<HTMLDivElement>(null);
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
	const onChangeRef = useHandlerRef(onChange);
	const onItemSelectRef = useHandlerRef(onItemSelect);
	const onEnterRef = useHandlerRef(onEnter);
	const isDropdownActive = hasChildren && (active ?? internalActive);

	const lockDropdown = React.useCallback(() => {
		// Prevent dropdown from re-opening when clicked on item with mouse
		// and focus moves to the item and back to the input
		lockedRef.current = true;
		setTimeout(() => {
			lockedRef.current = false;
		}, 100);
	}, []);

	const handleOpen = React.useCallback(() => {
		if (lockedRef.current) return;
		setInternalActive(true);
		onOpenRef.current?.();
	}, [onOpenRef]);

	const handleClose: T.Props["onClose"] = (args) => {
		setInternalActive(false);
		onCloseRef.current?.(args);
	};

	const handleItemClick: T.Context["onItemClick"] = React.useCallback(
		(args) => {
			onChangeRef.current?.({ value: args.value, name });
			onItemSelectRef.current?.(args);
			lockDropdown();
		},
		[lockDropdown, onChangeRef, onItemSelectRef, name]
	);

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

	const getOptionElements = React.useCallback(() => {
		const contentEl = contentRef.current;

		if (!contentEl) return [];
		return Array.from(contentEl.querySelectorAll("[role=option]:not([disabled])")) as HTMLElement[];
	}, []);

	useHotkeys(
		{
			[keys.ENTER]: () => {
				const options = getOptionElements();
				const highlightedOption = options.find((el) => el.id === highlightedId);

				highlightedOption?.click();
				onEnterRef.current?.();
			},
			[keys.BACKSPACE]: () => {
				onBackspaceRef.current?.();
			},
		},
		[getOptionElements, onEnterRef, onBackspaceRef, highlightedId],
		{ ref: inputRef }
	);

	useHotkeys(
		{
			[keys.UP]: () => {
				const options = getOptionElements();

				if (options.length) {
					const highlightedIndex = options.findIndex((el) => el.id === highlightedId);
					const nextOption = options.at(highlightedIndex - 1) || options.at(-1)!;

					setHighlightedId(nextOption.id);
				}
			},
			[keys.DOWN]: () => {
				handleOpen();

				const options = getOptionElements();

				if (options.length) {
					const highlightedIndex = options.findIndex((el) => el.id === highlightedId);
					const nextOption = options.at(highlightedIndex + 1) || options.at(0)!;

					setHighlightedId(nextOption.id);
				}
			},
		},
		[handleOpen, getOptionElements, highlightedId],
		{ ref: inputRef, preventDefault: true }
	);

	useIsomorphicLayoutEffect(() => {
		if (!isDropdownActive) return;

		requestAnimationFrame(() => {
			const options = getOptionElements();
			const firstId = options[0]?.id;

			if (firstId) setHighlightedId(firstId);
		});
	}, [isDropdownActive]);

	const contextValue = React.useMemo(
		() => ({
			onItemClick: handleItemClick,
			highlightedId,
			setHighlightedId,
		}),
		[highlightedId, handleItemClick]
	);

	return (
		<AutocompleteContext.Provider value={contextValue}>
			<DropdownMenu
				position="bottom"
				width="trigger"
				triggerType="focus"
				trapFocusMode={false}
				active={isDropdownActive}
				onClose={handleClose}
				onOpen={handleOpen}
				containerRef={containerRef}
				fallbackAdjustLayout={fallbackAdjustLayout}
				fallbackMinWidth={fallbackMinWidth}
				fallbackMinHeight={fallbackMinHeight}
				contentMaxHeight={contentMaxHeight}
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
								"aria-activedescendant": highlightedId,
								"aria-haspopup": "listbox",
								"aria-autocomplete": "list",
							}}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					attributes={{ onClick: handleContentClick, role: "listbox", ref: contentRef }}
				>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu>
		</AutocompleteContext.Provider>
	);
};

export const AutocompleteItem: React.FC<T.ItemProps> = (props) => {
	const { value, data, onClick, disabled, ...menuItemProps } = props;
	const { onItemClick, highlightedId } = React.useContext(AutocompleteContext);
	const id = useElementId();
	const highlighted = highlightedId === id;

	const handleClick: MenuItemProps["onClick"] = (e) => {
		onClick?.(e);
		onItemClick({ value, data });
	};

	return (
		<DropdownMenu.Item
			{...menuItemProps}
			className={[disabled && s["item--disabled"], menuItemProps.className]}
			highlighted={highlighted}
			disabled={disabled}
			attributes={{
				...menuItemProps.attributes,
				role: "option",
				id,
				tabIndex: highlighted ? 0 : -1,
			}}
			onClick={handleClick}
		/>
	);
};

Autocomplete.displayName = "Autocomplete";
AutocompleteItem.displayName = "Autocomplete.Item";

export default Autocomplete;
