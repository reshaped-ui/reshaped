import React from "react";

import type { Attributes } from "@/types/global";

export type ContentProps = {
	active?: boolean;
	children?: React.ReactNode;
	attributes?: Attributes<"div">;
};
