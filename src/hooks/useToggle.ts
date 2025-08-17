"use client";

import React from "react";

const useToggle = (defaultValue?: boolean) => {
	const [active, setActive] = React.useState(defaultValue || false);

	const activate = React.useCallback(() => {
		setActive(true);
	}, []);

	const deactivate = React.useCallback(() => {
		setActive(false);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const toggle = React.useCallback((targetValue?: any) => {
		// Checking the targetValue type for backwards compatibility if something like handler events
		// are passed automatically e.g. onClick={toggle}
		setActive(typeof targetValue === "boolean" ? targetValue : (active) => !active);
	}, []);

	return React.useMemo(
		() => ({ active, activate, deactivate, toggle }),
		[activate, deactivate, toggle, active]
	);
};

export default useToggle;
