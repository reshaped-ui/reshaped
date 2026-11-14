"use client";

import React from "react";

import { useFlyoutContext } from "@/components/Flyout";
import Icon from "@/components/Icon";
import MenuItem from "@/components/MenuItem";
import Popover from "@/components/Popover";
import useHandlerRef from "@/hooks/useHandlerRef";
import useHotkeys from "@/hooks/useHotkeys";
import useRTL from "@/hooks/useRTL";
import * as keys from "@/constants/keys";
import IconChevronRight from "@/icons/ChevronRight";
import { DropdownMenuProvider, useDropdownMenu } from "./DropdownMenu.context";
import type * as T from "./DropdownMenu.types";
import s from "./DropdownMenu.module.css";

const DropdownMenuSubContext = React.createContext<React.RefObject<T.Instance> | null>(null);
const DropdownMenuSubTriggerContext = React.createContext<boolean>(false);
/**
 * Submenu opened with click, tracked by the content it's rendered in.
 * Content stops click propagation, so the submenu doesn't get its outside click
 * when another item of the same menu is pressed and has to be closed by the content instead
 */
const DropdownMenuActiveSubMenuContext =
	React.createContext<React.RefObject<T.ActiveSubMenu | null> | null>(null);
/**
 * Keeps the menu open after selecting an item, used by components built on top of DropdownMenu
 * For example, Select with multiple selection
 */
export const DropdownMenuKeepOpenContext = React.createContext<boolean>(false);

const DropdownMenu: React.FC<T.Props> = (props) => {
	const {
		children,
		position = "bottom-start",
		triggerType = "click",
		trapFocusMode = "action-menu",
		size,
		...popoverProps
	} = props;

	return (
		<DropdownMenuProvider size={size}>
			<Popover
				{...popoverProps}
				position={position}
				padding={1}
				trapFocusMode={trapFocusMode}
				triggerType={triggerType}
			>
				{children}
			</Popover>
		</DropdownMenuProvider>
	);
};

export const DropdownMenuContent: React.FC<T.ContentProps> = (props) => {
	const { children, attributes, className } = props;
	const { flyout } = useFlyoutContext();
	const subMenuInstance = React.useContext(DropdownMenuSubContext);
	const activeSubMenuRef = React.useRef<T.ActiveSubMenu>(null);
	const [rtl] = useRTL();
	const { ref } = useHotkeys<HTMLDivElement>(
		{
			[rtl ? keys.RIGHT : keys.LEFT]: () => {
				subMenuInstance?.current?.close();
			},
		},
		[subMenuInstance?.current],
		{
			disabled: flyout.status === "idle",
			ref: attributes?.ref as React.RefObject<HTMLDivElement | null>,
		}
	);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const activeSubMenu = activeSubMenuRef.current;

		if (activeSubMenu && !activeSubMenu.triggerElRef?.current?.contains(e.target as Node)) {
			activeSubMenu.close();
		}

		/**
		 * Stop event propagation to make sure outside click doesn't get triggered
		 * after the content is closed
		 */
		e.stopPropagation();
		attributes?.onClick?.(e);
	};

	return (
		<Popover.Content
			className={className}
			attributes={{ ...attributes, ref, onClick: handleClick }}
		>
			<DropdownMenuActiveSubMenuContext.Provider value={activeSubMenuRef}>
				{children}
			</DropdownMenuActiveSubMenuContext.Provider>
		</Popover.Content>
	);
};

export const DropdownMenuSection: React.FC<T.SectionProps> = (props) => {
	const { children } = props;

	return (
		// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
		<div className={s.section} role="group">
			{children}
		</div>
	);
};

export const DropdownMenuItem: React.FC<T.ItemProps> = (props) => {
	const { onClick, size } = props;
	const { handleClose } = useFlyoutContext();
	const { size: menuSize } = useDropdownMenu();
	const subTriggerContext = React.useContext(DropdownMenuSubTriggerContext);
	const keepOpen = React.useContext(DropdownMenuKeepOpenContext);

	const handleClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
		/**
		 * Don't close the menu when clicking on a trigger of a submenu
		 */
		if (handleClose && !subTriggerContext && !keepOpen) {
			handleClose({ closeParents: true, reason: "item-selection" });
		}
		if (onClick) onClick(e);
	};

	return (
		<MenuItem
			{...props}
			size={size ?? menuSize}
			focusIndicator="highlight"
			roundedCorners
			className={[s.item, props.className]}
			attributes={{ role: "menuitem", ...props.attributes }}
			onClick={handleClick}
		/>
	);
};

export const DropdownMenuSubMenu: React.FC<T.SubMenuProps> = (props) => {
	const {
		children,
		position = "end-top",
		contentGap = 0.5,
		triggerType = "hover",
		...dropdownMenuProps
	} = props;
	const dropdownMenuRef = React.useRef<T.Instance>(null);

	return (
		<DropdownMenuSubContext.Provider value={dropdownMenuRef}>
			<DropdownMenu
				{...dropdownMenuProps}
				triggerType={triggerType}
				position={position}
				contentGap={contentGap}
				instanceRef={dropdownMenuRef}
			>
				{children}
			</DropdownMenu>
		</DropdownMenuSubContext.Provider>
	);
};

export const DropdownMenuSubTriggerItem: React.FC<T.SubTriggerProps> = (props) => {
	const { children, attributes, ...menuItemProps } = props;
	const subMenuInstance = React.useContext(DropdownMenuSubContext);
	const [rtl] = useRTL();
	const { ref } = useHotkeys(
		{
			[rtl ? keys.LEFT : keys.RIGHT]: () => {
				subMenuInstance?.current?.open();
			},
		},
		[],
		{ ref: attributes?.ref, preventDefault: true }
	);

	return (
		<DropdownMenuItem
			{...menuItemProps}
			attributes={{ ...attributes, ref: ref as React.RefObject<HTMLButtonElement> }}
			endSlot={<Icon autoWidth svg={IconChevronRight} className={s.arrow} />}
		>
			{children}
		</DropdownMenuItem>
	);
};

export const DropdownMenuSubTrigger: React.FC<T.SubTriggerProps> = (props) => {
	const { attributes, ...menuItemProps } = props;
	const { flyout, triggerType, triggerElRef, handleClose } = useFlyoutContext();
	const activeSubMenuRef = React.useContext(DropdownMenuActiveSubMenuContext);
	const handleCloseRef = useHandlerRef(handleClose);
	const active = flyout.status !== "idle";

	React.useEffect(() => {
		if (!active || triggerType !== "click" || !activeSubMenuRef) return;

		const subMenu: T.ActiveSubMenu = {
			triggerElRef,
			close: () => handleCloseRef.current?.({}),
		};

		// Only one submenu can be opened at a time on the same level
		if (activeSubMenuRef.current) activeSubMenuRef.current.close();
		activeSubMenuRef.current = subMenu;

		return () => {
			if (activeSubMenuRef.current === subMenu) activeSubMenuRef.current = null;
		};
	}, [active, triggerType, triggerElRef, activeSubMenuRef, handleCloseRef]);

	return (
		<DropdownMenuSubTriggerContext.Provider value={true}>
			<Popover.Trigger>
				{(triggerAttributes) => {
					return (
						<DropdownMenuSubTriggerItem
							{...menuItemProps}
							attributes={{
								...attributes,
								...triggerAttributes,
							}}
						/>
					);
				}}
			</Popover.Trigger>
		</DropdownMenuSubTriggerContext.Provider>
	);
};

DropdownMenu.displayName = "DropdownMenu";
DropdownMenuContent.displayName = "DropdownMenu.Content";
DropdownMenuSection.displayName = "DropdownMenu.Section";
DropdownMenuItem.displayName = "DropdownMenu.Item";
DropdownMenuSubMenu.displayName = "DropdownMenu.SubMenu";
DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";

export default DropdownMenu;
