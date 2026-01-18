import React from "react";

import type { Attributes } from "@reshaped/headless";

export type ContentProps = {
	active?: boolean;
	children?: React.ReactNode;
	attributes?: Attributes<"div">;
};
