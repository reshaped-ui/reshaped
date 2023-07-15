"use client";

import React from "react";
import Popover from "components/Popover";
import MenuItem, { MenuItemProps } from "components/MenuItem";
import Icon from "components/Icon";
import { useFlyoutContext, FlyoutInstanceRef } from "components/_private/Flyout";
import IconChevronRight from "icons/ChevronRight";
import useHotkeys from "hooks/useHotkeys";
import useRTL from "hooks/useRTL";
import { getActiveElement } from "utilities/a11y";
import * as keys from "constants/keys";
import type * as T from "./DropdownMenu.types";
import s from "./DropdownMenu.module.css";

const DropdownMenuSubContext = React.createContext<React.RefObject<FlyoutInstanceRef> | null>(null);

const DropdownMenu = (props: T.Props) => {
	const {
		children,
		position = "bottom-start",
		triggerType = "click",
		trapFocusMode = "action-menu",
		...popoverProps
	} = props;

	return (
		<Popover
			{...popoverProps}
			position={position}
			padding={0}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
		>
			{children}
		</Popover>
	);
};

const DropdownMenuContent = (props: T.ContentProps) => {
	const { children, attributes } = props;
	const subMenuInstance = React.useContext(DropdownMenuSubContext);
	const [rtl] = useRTL();
	const { ref } = useHotkeys<HTMLDivElement>(
		{
			[rtl ? keys.RIGHT : keys.LEFT]: () => {
				subMenuInstance?.current?.close();
			},
			[keys.ENTER]: () => {
				const el = getActiveElement();
				el?.click();
			},
		},
		[subMenuInstance?.current]
	);

	return (
		<Popover.Content attributes={{ ...attributes, ref }}>
			<div className={s.menu} role="menu">
				{children}
			</div>
		</Popover.Content>
	);
};

const DropdownMenuSection = (props: T.SectionProps) => {
	const { children } = props;

	return (
		<div className={s.section} role="group">
			{children}
		</div>
	);
};

const DropdownMenuItem = (props: Omit<MenuItemProps, "roundedCorners">) => {
	const { onClick } = props;
	const { handleClose } = useFlyoutContext();

	const handleClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
		if (handleClose) handleClose({ closeParents: true });
		if (onClick) onClick(e);
	};

	return (
		<MenuItem
			{...props}
			roundedCorners
			className={s.item}
			attributes={{ ...props.attributes, role: "menuitem" }}
			onClick={handleClick}
		/>
	);
};

const DropdownMenuSubMenu = (props: T.SubMenuProps) => {
	const { children } = props;
	const dropdownMenuRef = React.useRef<FlyoutInstanceRef>();

	return (
		<DropdownMenuSubContext.Provider value={dropdownMenuRef}>
			<DropdownMenu
				triggerType="hover"
				position="end-top"
				contentGap={0.5}
				instanceRef={dropdownMenuRef}
			>
				{children}
			</DropdownMenu>
		</DropdownMenuSubContext.Provider>
	);
};

const DropdownMenuSubTriggerItem = (props: Omit<MenuItemProps, "endSlot" | "roundedCorners">) => {
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
		{ ref: attributes?.ref }
	);

	return (
		<DropdownMenuItem
			{...menuItemProps}
			attributes={{ ...attributes, ref }}
			endSlot={<Icon autoWidth svg={IconChevronRight} className={s.arrow} />}
		>
			{children}
		</DropdownMenuItem>
	);
};

const DropdownMenuSubTrigger = (props: T.SubTriggerProps) => {
	const { children } = props;

	return (
		<DropdownMenu.Trigger>
			{(attributes) => (
				<DropdownMenuSubTriggerItem attributes={attributes}>{children}</DropdownMenuSubTriggerItem>
			)}
		</DropdownMenu.Trigger>
	);
};

DropdownMenu.Trigger = Popover.Trigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Section = DropdownMenuSection;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.SubMenu = DropdownMenuSubMenu;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;

export default DropdownMenu;
