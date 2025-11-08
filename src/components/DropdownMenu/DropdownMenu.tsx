"use client";

import React from "react";

import { useFlyoutContext } from "components/Flyout";
import Icon from "components/Icon";
import MenuItem from "components/MenuItem";
import Popover from "components/Popover";
import * as keys from "constants/keys";
import useHotkeys from "hooks/useHotkeys";
import useRTL from "hooks/useRTL";
import IconChevronRight from "icons/ChevronRight";
import { classNames } from "utilities/props";

import s from "./DropdownMenu.module.css";

import type * as T from "./DropdownMenu.types";

const DropdownMenuSubContext = React.createContext<React.RefObject<T.Instance> | null>(null);
const DropdownMenuSubTriggerContext = React.createContext<boolean>(false);

const DropdownMenu: React.FC<T.Props> = (props) => {
	const {
		children,
		position = "bottom-start",
		triggerType = "click",
		trapFocusMode = "action-menu",
		borderRadius = "small",
		...popoverProps
	} = props;

	return (
		<Popover
			{...popoverProps}
			position={position}
			padding={0}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
			borderRadius={borderRadius}
			disableHideAnimation={triggerType !== "hover"}
		>
			{children}
		</Popover>
	);
};

export const DropdownMenuContent: React.FC<T.ContentProps> = (props) => {
	const { children, attributes, className } = props;
	const { flyout } = useFlyoutContext();
	const subMenuInstance = React.useContext(DropdownMenuSubContext);
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
	const contentClassName = classNames(s.menu, className);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		/**
		 * Stop event propagation to make sure outside click doesn't get triggered
		 * after the content is closed
		 */
		e.stopPropagation();
		attributes?.onClick?.(e);
	};

	return (
		<Popover.Content
			className={contentClassName}
			attributes={{ ...attributes, ref, onClick: handleClick }}
		>
			{children}
		</Popover.Content>
	);
};

export const DropdownMenuSection: React.FC<T.SectionProps> = (props) => {
	const { children } = props;

	return (
		<div className={s.section} role="group">
			{children}
		</div>
	);
};

export const DropdownMenuItem: React.FC<T.ItemProps> = (props) => {
	const { onClick } = props;
	const { handleClose } = useFlyoutContext();
	const subTriggerContext = React.useContext(DropdownMenuSubTriggerContext);

	const handleClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
		/**
		 * Don't close the menu when clicking on a trigger of a submenu
		 */
		if (handleClose && !subTriggerContext) {
			handleClose({ closeParents: true, reason: "item-selection" });
		}
		if (onClick) onClick(e);
	};

	return (
		<MenuItem
			{...props}
			roundedCorners
			className={[s.item, props.className]}
			attributes={{ role: "menuitem", ...props.attributes }}
			onClick={handleClick}
		/>
	);
};

export const DropdownMenuSubMenu: React.FC<T.SubMenuProps> = (props) => {
	const { children, position = "end-top", contentGap = 0.5, ...dropdownMenuProps } = props;
	const dropdownMenuRef = React.useRef<T.Instance>(null);

	return (
		<DropdownMenuSubContext.Provider value={dropdownMenuRef}>
			<DropdownMenu
				{...dropdownMenuProps}
				triggerType="hover"
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
