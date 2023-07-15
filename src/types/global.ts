import React from "react";

type ClassNameValue = string | null | undefined | false;
export type ClassName = ClassNameValue | ClassNameValue[];

export type CSSVariable = `--${string}`;
export type StyleAttribute = React.CSSProperties & Record<CSSVariable, string | number | undefined>;
type DataAttributes = Record<`data-${string}`, string | boolean>;

export type Attributes<TagName = void, O = void> = Omit<
	(TagName extends keyof JSX.IntrinsicElements
		? JSX.IntrinsicElements[TagName]
		: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) &
		DataAttributes & { style?: StyleAttribute },
	O extends object ? keyof O : "className"
>;

export type Viewport = "s" | "m" | "l" | "xl";
export type ResponsiveOnly<T> = { [key in Viewport]?: T };
export type Responsive<T> = T | ResponsiveOnly<T>;

/**
 * Form handlers
 */
type ChangeHandlerArgs<Value, Event> = Value extends Boolean
	? { name: string; value?: string; checked: Value; event?: Event }
	: { name: string; value: Value; event?: Event };

export type ChangeHandler<Value, Event = React.ChangeEvent<HTMLInputElement>> = (
	args: ChangeHandlerArgs<Value, Event>
) => void;
