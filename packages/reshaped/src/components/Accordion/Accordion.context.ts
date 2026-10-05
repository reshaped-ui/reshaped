"use client";

import React from "react";

import * as T from "./Accordion.types.js";

const AccordionContext = React.createContext<T.ContextProps>({
	active: false,
	onToggle: () => {},
	triggerId: "",
	contentId: "",
});

export default AccordionContext;
