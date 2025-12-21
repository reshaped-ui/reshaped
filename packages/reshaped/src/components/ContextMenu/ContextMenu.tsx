"use client";

import React from "react";

import DropdownMenu from "components/DropdownMenu";
import useHandlerRef from "hooks/useHandlerRef";
import useScrollLock from "hooks/useScrollLock";

import s from "./ContextMenu.module.css";

import type * as T from "./ContextMenu.types";
import type * as G from "types/global";

const ContextMenu: React.FC<T.Props> = (props) => {
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
				onClose={(args) => {
					setCoordinates(undefined);
					unlockScroll();
					onClose?.(args);
				}}
			/>
		</div>
	);
};

ContextMenu.displayName = "ContextMenu";

export default ContextMenu;
