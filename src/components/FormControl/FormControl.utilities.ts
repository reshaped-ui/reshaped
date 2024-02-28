import type * as T from "./FormControl.types";

export const getCaptionId = (id: string, variant?: T.PrivateCaptionProps["variant"]) =>
	`${id}-${variant || "caption"}`;
