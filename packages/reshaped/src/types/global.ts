import React from "react";

export type Viewport = "s" | "m" | "l" | "xl";
export type ResponsiveOnly<T> = { [key in Viewport]?: T };
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
