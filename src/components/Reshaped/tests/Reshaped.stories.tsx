import { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import { useTheme } from "components/Theme";

import Reshaped from "../Reshaped";

import type * as G from "types/global";

export default {
	title: "Utility components/Reshaped",
	parameters: {
		disableWrapper: true,
	},
};

export const rtl = {
	name: "defaultRTL",
	render: () => (
		<Reshaped defaultRTL theme="reshaped" defaultColorMode="dark">
			Hello
		</Reshaped>
	),
};

export const controlledMode: StoryObj = {
	name: "colorMode, controlled",
	render: () => {
		const [mode, setMode] = useState<G.ColorMode>("dark");

		return (
			<Reshaped theme="reshaped" colorMode={mode}>
				<Button
					onClick={() => {
						setMode(mode === "dark" ? "light" : "dark");
					}}
				>
					Toggle color mode
				</Button>
			</Reshaped>
		);
	},
	play: async ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];

		expect(document.documentElement.getAttribute("data-rs-color-mode")).toEqual("dark");

		await userEvent.click(button);

		expect(document.documentElement.getAttribute("data-rs-color-mode")).toEqual("light");
	},
};

export const lightMode = {
	name: "defaultColorMode=light",
	render: () => <Reshaped theme="reshaped">Hello</Reshaped>,
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("light");
	},
};

export const darkMode = {
	name: "defaultColorMode=dark",
	render: () => (
		<Reshaped theme="reshaped" defaultColorMode="dark">
			Hello
		</Reshaped>
	),
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("dark");
	},
};

export const scoped = {
	name: "scoped",
	render: () => (
		<Reshaped theme="reshaped" defaultColorMode="dark" scoped>
			Hello
		</Reshaped>
	),
	play: async () => {
		const root = document.querySelector("[data-rs-root]");

		expect(root).toBeInTheDocument();
		expect(root).not.toBe(document.documentElement);
		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(document.documentElement).not.toHaveAttribute("data-rs-theme");
	},
};

const ScopedComponent = () => {
	const { invertColorMode } = useTheme();

	return <Button onClick={invertColorMode}>Invert</Button>;
};

export const testScoped: StoryObj = {
	name: "test: scoped switch",
	render: () => (
		<Reshaped theme="reshaped">
			<Reshaped theme="slate" scoped>
				<ScopedComponent />
			</Reshaped>
		</Reshaped>
	),
	play: async ({ canvas }) => {
		const nestedRoot = document.querySelector("[data-rs-root]");
		const button = canvas.getAllByRole("button")[0];

		expect(document.documentElement).toHaveAttribute("data-rs-theme", "reshaped");
		expect(document.documentElement).toHaveAttribute("data-rs-color-mode", "light");

		expect(nestedRoot).toHaveAttribute("data-rs-theme", "slate");
		expect(nestedRoot).toHaveAttribute("data-rs-color-mode", "light");

		await userEvent.click(button);

		expect(document.documentElement).toHaveAttribute("data-rs-color-mode", "light");
		expect(nestedRoot).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const keyboardMode = {
	name: "test: keyboard mode",
	render: () => (
		<Reshaped theme="reshaped" defaultColorMode="dark">
			Hello
		</Reshaped>
	),
	play: async () => {
		const attribute = "data-rs-keyboard";

		expect(document.documentElement).not.toHaveAttribute(attribute);
		await userEvent.keyboard("{Tab/}");
		expect(document.documentElement).toHaveAttribute(attribute);
		await userEvent.click(document.body);
		expect(document.documentElement).not.toHaveAttribute(attribute);
	},
};
