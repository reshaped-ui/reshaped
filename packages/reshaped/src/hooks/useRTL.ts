"use client";

import React from "react";

import { SingletonEnvironmentContext } from "hooks/_private/useSingletonEnvironment";

const useRTL = () => {
	return React.useContext(SingletonEnvironmentContext).rtl;
};

export default useRTL;
