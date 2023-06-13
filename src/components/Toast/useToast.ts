"use client";

import React from "react";
import ToastContext from "./Toast.context";

const useToast = () => {
	const { add, hide } = React.useContext(ToastContext);

	return React.useMemo(() => ({ show: add, hide }), [add, hide]);
};

export default useToast;
