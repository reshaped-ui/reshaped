"use client";

import React from "react";
import FlyoutControlled from "./FlyoutControlled";
import type * as T from "./Flyout.types";

const FlyoutUncontrolled: React.FC<T.UncontrolledProps & T.DefaultProps> = (props) => {
	const { defaultActive, onClose, onOpen } = props;
	const [active, setActive] = React.useState(defaultActive || false);
	console.log("active", active);

	const handleClose: T.Props["onClose"] = (args) => {
		console.log("close");
		setActive(false);
		onClose?.(args);
	};

	const handleOpen = () => {
		setActive(true);
		onOpen?.();
	};

	React.useEffect(() => {
		console.log("mount");
	}, []);

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
