import type React from "react";

export type Props = {
	children: React.ReactNode;
	size?: "medium" | "large";
	hasError?: boolean;
	required?: boolean;
	disabled?: boolean;
	group?: boolean;
	id?: string;
};

export type LabelProps = {
	children: React.ReactNode;
};

export type CaptionProps = {
	children: React.ReactNode;
};

export type PrivateCaptionProps = CaptionProps & {
	variant?: "error";
	disabled?: boolean;
};

type Attributes = {
	[K in keyof React.HTMLAttributes<HTMLElement>]?: React.HTMLAttributes<HTMLElement>[K];
};

export type Context = {
	required?: boolean;
	group?: boolean;
	attributes: Attributes & { id: string };
	helperRef: () => void;
	errorRef: () => void;
} & Pick<Props, "hasError" | "disabled" | "size">;
