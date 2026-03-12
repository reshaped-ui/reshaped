import React from "react";

export type Viewport = "s" | "m" | "l" | "xl";

// if ResponsiveOnly<T> is { [key in Viewport]?: T } without the intersection and T is an object such as ButtonProps,
// Responsive<T> would allow mixing keys of T with viewport keys without any type error
export type ResponsiveOnly<T> = { [key in Viewport]?: T } & (T extends object
	? { [K in Exclude<keyof T & string, Viewport>]?: never }
	: Record<never, never>);
export type Responsive<T> = T | ResponsiveOnly<T>;

/**
 * Form handlers
 */
type ChangeHandlerArgs<Value, Event> = Value extends boolean
	? { name: string; value?: string; checked: Value; event?: Event }
	: { name: string; value: Value; event?: Event };

export type ChangeHandler<Value, Event = React.ChangeEvent<HTMLInputElement>> = (
	args: ChangeHandlerArgs<Value, Event>
) => void;

/**
 * Theming
 */

export type ColorMode = "light" | "dark";
export type Theme = string | string[];
