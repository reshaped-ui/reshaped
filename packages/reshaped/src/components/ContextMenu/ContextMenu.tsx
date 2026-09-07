"use client";

import React from "react";
import type { Coordinates } from "@reshaped/utilities/internal";

import DropdownMenu from "@/components/DropdownMenu";
import useHandlerRef from "@/hooks/useHandlerRef";
import useScrollLock from "@/hooks/useScrollLock";
import type * as T from "./ContextMenu.types";
import s from "./ContextMenu.module.css";

const ContextMenu: React.FC<T.Props> = (props) => {
	const { position = "end-top", onOpen, onClose, triggerRef, ...dropdownMenuProps } = props;
	const [coordinates, setCoordinates] = React.useState<Coordinates>();
	const internalOriginRef = React.useRef<HTMLDivElement>(null);
	const originRef = triggerRef || internalOriginRef;
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
	}, [lockScroll, onOpenRef, originRef]);

	React.useEffect(() => {
		return () => unlockScroll();
	}, [unlockScroll]);

	return (
		<div className={s.root} ref={internalOriginRef}>
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
