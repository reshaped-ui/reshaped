import React from "react";

/**
 * DOM
 */
type ClassNameValue = string | null | undefined | false;
export type ClassName = ClassNameValue | ClassNameValue[] | ClassName[];

export type CSSVariable = `--${string}`;
export type StyleAttribute =
	| React.CSSProperties
	| (React.CSSProperties & Record<CSSVariable, string | number | undefined>);

type DataAttributes = object | Record<`data-${string}`, string | boolean>;

export type Attributes<TagName extends keyof React.JSX.IntrinsicElements | void = void> =
	// If tag name is not passed, fallback to HTMLElement attributes
	(TagName extends keyof React.JSX.IntrinsicElements
		? React.JSX.IntrinsicElements[TagName]
		: React.HTMLAttributes<HTMLElement>) &
		DataAttributes & { style?: StyleAttribute };

export type Viewport = "s" | "m" | "l" | "xl";
export type ResponsiveOnly<T> = { [key in Viewport]?: T };
export type Responsive<T> = T | ResponsiveOnly<T>;

export type Coordinates = { x: number; y: number };

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
