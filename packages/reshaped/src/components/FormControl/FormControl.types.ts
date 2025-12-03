import type React from "react";

export type Props = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Component size, to be used together with the other form component sizes */
	size?: "medium" | "large";
	/** Change component to show an error state and display FormControl.Error */
	hasError?: boolean;
	/** Change component to show a required indicator */
	required?: boolean;
	/** Apply disabled styles */
	disabled?: boolean;
	/** Apply semantic html markup when used for displaying multiple form fields together with a single label */
	group?: boolean;
	/** Custom id for the form control */
	id?: string;
};

export type LabelProps = {
	/** Node for inserting the label text */
	children: React.ReactNode;
};

export type CaptionProps = {
	/** Node for inserting the caption text */
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
