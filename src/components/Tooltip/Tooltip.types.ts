import React from "react";
import type { FlyoutProps, FlyoutTriggerProps } from "components/_private/Flyout";

export type Props = Pick<FlyoutProps, "id" | "position" | "onOpen" | "onClose" | "active"> &
	Pick<FlyoutTriggerProps, "children"> & {
		text?: React.ReactNode;
	};
