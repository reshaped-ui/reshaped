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

	const toggle = React.useCallback(() => {
		setActive((active) => !active);
	}, []);

	return { active, activate, deactivate, toggle };
};

export default useToggle;
