"use client";

import React from "react";

import FlyoutControlled from "./FlyoutControlled";

import type * as T from "./Flyout.types";

const FlyoutUncontrolled: React.FC<T.UncontrolledProps & T.DefaultProps> = (props) => {
	const { defaultActive, onClose, onOpen } = props;
	const [active, setActive] = React.useState(defaultActive || false);

	const handleClose: T.Props["onClose"] = (args) => {
		setActive(false);
		onClose?.(args);
	};

	const handleOpen = () => {
		setActive(true);
		onOpen?.();
	};

	return (
		<FlyoutControlled
			{...props}
			defaultActive={undefined}
			active={active}
			onClose={handleClose}
			onOpen={handleOpen}
		/>
	);
};

FlyoutUncontrolled.displayName = "FlyoutUncontrolled";

export default FlyoutUncontrolled;
