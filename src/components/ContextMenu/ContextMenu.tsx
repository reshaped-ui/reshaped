"use client";

import React from "react";
import DropdownMenu from "components/DropdownMenu";
import useScrollLock from "hooks/useScrollLock";
import type * as G from "types/global";
import type * as T from "./ContextMenu.types";
import s from "./ContextMenu.module.css";

const ContextMenu = (props: T.Props) => {
	const { position = "end-top", ...dropdownMenuProps } = props;
	const [coordinates, setCoordinates] = React.useState<G.Coordinates>();
	const containerRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll } = useScrollLock({ containerRef });

	React.useEffect(() => {
		const containerEl = containerRef.current;
		if (!containerEl) return;

		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			setCoordinates({ x: e.clientX, y: e.clientY });
			lockScroll();
		};

		containerEl.addEventListener("contextmenu", handleContextMenu);
		return () => containerEl.removeEventListener("contextmenu", handleContextMenu);
	}, [lockScroll]);

	React.useEffect(() => {
		return () => unlockScroll();
	}, [unlockScroll]);

	return (
		<div className={s.root} ref={containerRef}>
			<DropdownMenu
				{...dropdownMenuProps}
				position={position}
				originCoordinates={coordinates}
				active={!!coordinates}
				onClose={() => {
					setCoordinates(undefined);
					unlockScroll();
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
