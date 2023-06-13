import React from "react";
import { TextProps } from "components/Text";

export type Props = {
	children: React.ReactNode;
	size?: "medium" | "large";
	hasError?: boolean;
	hasSuccess?: boolean;
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
	color?: TextProps["color"];
};

type Attributes = {
	[K in keyof React.HTMLAttributes<HTMLElement>]?: React.HTMLAttributes<HTMLElement>[K];
};

export type Context = {
	required?: boolean;
	group?: boolean;
	attributes: Attributes & { id: string };
} & Pick<Props, "hasError" | "hasSuccess" | "disabled" | "size">;
