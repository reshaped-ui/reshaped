/**
 * Render helpers for browser tests (`*.test.tsx`), wrapping the tested node
 * in the Reshaped provider the same way Storybook does.
 */
import React from "react";
import {
	render as baseRender,
	renderHook as baseRenderHook,
	type RenderHookOptions,
	type RenderOptions,
} from "vitest-browser-react";

import Reshaped from "@/components/Reshaped";

const Provider = (props: { children: React.ReactNode }) => (
	<Reshaped defaultTheme="slate">{props.children}</Reshaped>
);

export const render = (ui: React.ReactNode, options?: RenderOptions) =>
	baseRender(ui, { wrapper: Provider, ...options });

export const renderHook = <Props, Result>(
	callback: (initialProps?: Props) => Result,
	options?: RenderHookOptions<Props>
) => baseRenderHook(callback, { wrapper: Provider, ...options });
