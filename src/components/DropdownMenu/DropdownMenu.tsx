"use client";

import React from "react";
import Popover from "components/Popover";
import MenuItem from "components/MenuItem";
import Icon from "components/Icon";
import { useFlyoutContext } from "components/Flyout";
import IconChevronRight from "icons/ChevronRight";
import useHotkeys from "hooks/useHotkeys";
import useRTL from "hooks/useRTL";
import { classNames } from "utilities/props";
import * as keys from "constants/keys";
import type * as T from "./DropdownMenu.types";
import s from "./DropdownMenu.module.css";

const DropdownMenuSubContext = React.createContext<React.RefObject<T.Instance> | null>(null);
const DropdownMenuSubTriggerContext = React.createContext<boolean>(false);

const DropdownMenu: React.FC<T.Props> & {
	Dismissible: typeof Popover.Dismissible;
	Trigger: typeof Popover.Trigger;
	Content: typeof DropdownMenuContent;
	Section: typeof DropdownMenuSection;
	Item: typeof DropdownMenuItem;
	SubMenu: typeof DropdownMenuSubMenu;
	SubTrigger: typeof DropdownMenuSubTrigger;
} = (props) => {
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

const DropdownMenuContent: React.FC<T.ContentProps> = (props) => {
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

	const handleClick = (e: React.MouseEvent) => {
		/**
		 * Stop event propagation to make sure outside click doesn't get triggered
		 * after the content is closed
		 */
		e.stopPropagation();
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

const DropdownMenuSection: React.FC<T.SectionProps> = (props) => {
	const { children } = props;

	return (
		<div className={s.section} role="group">
			{children}
		</div>
	);
};

const DropdownMenuItem: React.FC<T.ItemProps> = (props) => {
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

const DropdownMenuSubMenu: React.FC<T.SubMenuProps> = (props) => {
	const { children } = props;
	const dropdownMenuRef = React.useRef<T.Instance>(null);

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

const DropdownMenuSubTriggerItem: React.FC<T.SubTriggerProps> = (props) => {
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

const DropdownMenuSubTrigger: React.FC<T.SubTriggerProps> = (props) => {
	const { attributes, ...menuItemProps } = props;

	return (
		<DropdownMenuSubTriggerContext.Provider value={true}>
			<DropdownMenu.Trigger>
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
			</DropdownMenu.Trigger>
		</DropdownMenuSubTriggerContext.Provider>
	);
};

DropdownMenu.Dismissible = Popover.Dismissible;
DropdownMenu.Trigger = Popover.Trigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Section = DropdownMenuSection;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.SubMenu = DropdownMenuSubMenu;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;

DropdownMenu.displayName = "DropdownMenu";
DropdownMenuContent.displayName = "DropdownMenu.Content";
DropdownMenuSection.displayName = "DropdownMenu.Section";
DropdownMenuItem.displayName = "DropdownMenu.Item";
DropdownMenuSubMenu.displayName = "DropdownMenu.SubMenu";
DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";

export default DropdownMenu;
