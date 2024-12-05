import React from "react";

type ClassNameValue = string | null | undefined | false;
export type ClassName = ClassNameValue | ClassNameValue[] | ClassName[];

export type CSSVariable = `--${string}`;
export type StyleAttribute =
	| React.CSSProperties
	| (React.CSSProperties & Record<CSSVariable, string | number | undefined>);

// Align with the
type DataAttributes = {} | Record<`data-${string}`, string | boolean>;

export type Attributes<TagName extends keyof JSX.IntrinsicElements = "div"> =
	JSX.IntrinsicElements[TagName] & DataAttributes & { style?: StyleAttribute };

export type Viewport = "s" | "m" | "l" | "xl";
export type ResponsiveOnly<T> = { [key in Viewport]?: T };
export type Responsive<T> = T | ResponsiveOnly<T>;

export type Coordinates = { x: number; y: number };

/**
 * Form handlers
 */
type ChangeHandlerArgs<Value, Event> = Value extends Boolean
	? { name: string; value?: string; checked: Value; event?: Event }
	: { name: string; value: Value; event?: Event };

export type ChangeHandler<Value, Event = React.ChangeEvent<HTMLInputElement>> = (
	args: ChangeHandlerArgs<Value, Event>
) => void;
