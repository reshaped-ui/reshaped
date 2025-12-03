"use client";

import React from "react";

import ToastContext from "./Toast.context";

const useToast = () => {
	const { add, hide, id } = React.useContext(ToastContext);

	return React.useMemo(() => ({ show: add, hide, id }), [add, hide, id]);
};

export default useToast;
