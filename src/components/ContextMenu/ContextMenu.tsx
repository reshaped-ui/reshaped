"use client";

import React from "react";
import DropdownMenu from "components/DropdownMenu";
import useScrollLock from "hooks/useScrollLock";
import type * as G from "types/global";
import type * as T from "./ContextMenu.types";
import s from "./ContextMenu.module.css";
import useHandlerRef from "hooks/useHandlerRef";

const ContextMenu = (props: T.Props) => {
	const { position = "end-top", onOpen, onClose, ...dropdownMenuProps } = props;
	const [coordinates, setCoordinates] = React.useState<G.Coordinates>();
	const originRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll } = useScrollLock({ originRef });
	const onOpenRef = useHandlerRef(onOpen);

	React.useEffect(() => {
		const originEl = originRef.current;
		if (!originEl) return;

		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			setCoordinates({ x: e.clientX, y: e.clientY });
			lockScroll();
			onOpenRef.current?.();
		};

		originEl.addEventListener("contextmenu", handleContextMenu);
		return () => originEl.removeEventListener("contextmenu", handleContextMenu);
	}, [lockScroll, onOpenRef]);

	React.useEffect(() => {
		return () => unlockScroll();
	}, [unlockScroll]);

	return (
		<div className={s.root} ref={originRef}>
			<DropdownMenu
				{...dropdownMenuProps}
				position={position}
				originCoordinates={coordinates}
				active={!!coordinates}
				onClose={() => {
					setCoordinates(undefined);
					unlockScroll();
					onClose?.();
				}}
			/>
		</div>
	);
};

ContextMenu.Content = DropdownMenu.Content;
ContextMenu.Item = DropdownMenu.Item;
ContextMenu.Section = DropdownMenu.Section;
ContextMenu.SubMenu = DropdownMenu.SubMenu;
ContextMenu.SubTrigger = DropdownMenu.SubTrigger;

export default ContextMenu;
