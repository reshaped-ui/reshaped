"use client";

import React from "react";
import DropdownMenu, { type DropdownMenuProps } from "components/DropdownMenu";
import type * as G from "types/global";
import s from "./ContextMenu.module.css";

const ContextMenuContext = React.createContext(
	{} as {
		setCoordinates: (coordinates: G.Coordinates) => void;
	}
);

const ContextMenu = (props: Omit<DropdownMenuProps, "active" | "defaultActive">) => {
	const { position = "end-top", ...dropdownMenuProps } = props;
	const [coordinates, setCoordinates] = React.useState<G.Coordinates>();

	React.useEffect(() => {
		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			setCoordinates({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("contextmenu", handleContextMenu);
		return () => window.removeEventListener("contextmenu", handleContextMenu);
	}, []);

	return (
		<ContextMenuContext.Provider value={{ setCoordinates }}>
			<div className={s.root}>
				<DropdownMenu
					{...dropdownMenuProps}
					position={position}
					originCoordinates={coordinates}
					active={!!coordinates}
					onClose={() => {
						setCoordinates(undefined);
					}}
				/>
			</div>
		</ContextMenuContext.Provider>
	);
};

ContextMenu.Content = DropdownMenu.Content;
ContextMenu.Item = DropdownMenu.Item;
ContextMenu.Section = DropdownMenu.Section;
ContextMenu.SubMenu = DropdownMenu.SubMenu;
ContextMenu.SubTrigger = DropdownMenu.SubTrigger;
export default ContextMenu;
