import React from "react";

import * as G from "types/global";

export type ContentProps = {
	active?: boolean;
	children?: React.ReactNode;
	attributes?: G.Attributes<"div">;
};
