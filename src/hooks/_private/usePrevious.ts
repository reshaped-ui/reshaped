"use client";

import React from "react";

const copy = <T>(value?: T) => {
	const valueIsDate = value instanceof Date;

	if (valueIsDate) return String(valueIsDate);

	const string = JSON.stringify(value);

	return JSON.parse(string);
};

const usePrevious = <T>(value?: T, clean = false) => {
	const ref = React.useRef<T>(clean ? copy<T>(value) : value);

	React.useEffect(() => {
		ref.current = clean ? copy<T>(value) : value;
	}, [value, clean]);

	// eslint-disable-next-line react-hooks/refs
	return ref.current;
};

export default usePrevious;
