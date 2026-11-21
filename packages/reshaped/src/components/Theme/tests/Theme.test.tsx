import React from "react";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Reshaped from "@/components/Reshaped";
import Theme, { useTheme } from "@/components/Theme";
import { render } from "@/tests/render";

// Matches the Storybook decorator, which uses dark mode by default
const DarkProvider = (props: { children: React.ReactNode }) => (
	<Reshaped defaultTheme="slate" defaultColorMode="dark">
		{props.children}
	</Reshaped>
);

const renderDark = (ui: React.ReactNode) => render(ui, { wrapper: DarkProvider });

const getThemeRoot = (testId: string) => page.getByTestId(testId).element().parentElement!;

const SwitchToSlate = () => {
	const { setTheme } = useTheme();

	return (
		<Button color="primary" onClick={() => setTheme("slate")}>
			Switch to slate
		</Button>
	);
};

describe("Utility components/Theme", () => {
	test("scoped, single", async () => {
		await renderDark(
			<Theme name="reshaped">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("scoped, multiple", async () => {
		await renderDark(
			<Theme name={["reshaped", "figma"]}>
				<Card attributes={{ "data-testid": "test-id-multi" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id-multi");

		await expect.element(root).toHaveAttribute("data-rs-theme", " reshaped figma ");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("light", async () => {
		await renderDark(
			<Theme name="reshaped" colorMode="light">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("dark", async () => {
		await render(
			<Theme name="reshaped" colorMode="dark">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("inherited", async () => {
		await renderDark(
			<Theme name="reshaped">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("inherited, light provider", async () => {
		await render(
			<Theme name="reshaped">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("inverted", async () => {
		await renderDark(
			<Theme name="reshaped" colorMode="inverted">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("inverted, light provider", async () => {
		await render(
			<Theme name="reshaped" colorMode="inverted">
				<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
			</Theme>
		);
		const root = getThemeRoot("test-id");

		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("controlled", async () => {
		await renderDark(
			<div data-testid="root">
				<Theme name="reshaped">
					<SwitchToSlate />
				</Theme>
			</div>
		);
		const root = page.getByTestId("root").element().firstElementChild as HTMLElement;
		const trigger = page.getByRole("button", { name: "Switch to slate" });

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");

		await userEvent.click(trigger);

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("uncontrolled", async () => {
		await renderDark(
			<div data-testid="root">
				<Theme defaultName="reshaped">
					<SwitchToSlate />
				</Theme>
			</div>
		);
		const root = page.getByTestId("root").element().firstElementChild as HTMLElement;
		const trigger = page.getByRole("button", { name: "Switch to slate" });

		await expect.element(root).toHaveAttribute("data-rs-theme", "reshaped");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");

		await userEvent.click(trigger);

		await expect.element(root).toHaveAttribute("data-rs-theme", "slate");
		await expect.element(root).toHaveAttribute("data-rs-color-mode", "dark");
	});
});
