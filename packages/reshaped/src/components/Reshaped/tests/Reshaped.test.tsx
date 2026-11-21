import React from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Reshaped from "@/components/Reshaped";
import { useTheme } from "@/components/Theme";
import { render } from "@/tests/render";
import type * as G from "@/types/global";

// Reshaped is the provider under test, so skip the default provider wrapper
const NoWrapper = (props: { children: React.ReactNode }) => <>{props.children}</>;
const renderBare = (ui: React.ReactNode) => render(ui, { wrapper: NoWrapper });

const html = document.documentElement;

const ControlledMode = () => {
	const [mode, setMode] = React.useState<G.ColorMode>("dark");

	return (
		<Reshaped theme="slate" colorMode={mode}>
			<Button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>Toggle color mode</Button>
		</Reshaped>
	);
};

const ScopedComponent = () => {
	const { invertColorMode } = useTheme();

	return <Button onClick={invertColorMode}>Invert</Button>;
};

describe("Utility components/Reshaped", () => {
	// The provider writes to <html>, make sure every test starts from a clean root
	beforeEach(() => {
		["data-rs-theme", "data-rs-color-mode", "data-rs-keyboard", "dir"].forEach((attribute) => {
			html.removeAttribute(attribute);
		});
	});

	test("colorMode, controlled", async () => {
		await renderBare(<ControlledMode />);

		await expect.element(html).toHaveAttribute("data-rs-color-mode", "dark");

		await userEvent.click(page.getByRole("button", { name: "Toggle color mode" }));

		await expect.element(html).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("defaultColorMode=light", async () => {
		await renderBare(<Reshaped theme="slate">Hello</Reshaped>);

		await expect.element(html).toHaveAttribute("data-rs-theme", "slate");
		await expect.element(html).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("defaultColorMode=dark", async () => {
		await renderBare(
			<Reshaped theme="slate" defaultColorMode="dark">
				Hello
			</Reshaped>
		);

		await expect.element(html).toHaveAttribute("data-rs-theme", "slate");
		await expect.element(html).toHaveAttribute("data-rs-color-mode", "dark");
	});

	test("defaultRTL", async () => {
		await renderBare(
			<Reshaped defaultRTL theme="slate">
				Hello
			</Reshaped>
		);

		await expect.element(html).toHaveAttribute("dir", "rtl");
	});

	test("scoped", async () => {
		await renderBare(
			<Reshaped theme="slate" defaultColorMode="dark" scoped>
				Hello
			</Reshaped>
		);
		const root = document.querySelector("[data-rs-root]");

		expect(root).not.toBeNull();
		expect(root).not.toBe(html);
		await expect.element(root as HTMLElement).toHaveAttribute("data-rs-theme", "slate");
		await expect.element(html).not.toHaveAttribute("data-rs-theme");
	});

	test("scoped switch", async () => {
		await renderBare(
			<Reshaped theme="slate">
				<Reshaped theme="figma" scoped>
					<ScopedComponent />
				</Reshaped>
			</Reshaped>
		);
		const nestedRoot = document.querySelector("[data-rs-root]") as HTMLElement;

		await expect.element(html).toHaveAttribute("data-rs-theme", "slate");
		await expect.element(html).toHaveAttribute("data-rs-color-mode", "light");

		await expect.element(nestedRoot).toHaveAttribute("data-rs-theme", "figma");
		await expect.element(nestedRoot).toHaveAttribute("data-rs-color-mode", "light");

		await userEvent.click(page.getByRole("button", { name: "Invert" }));

		await expect.element(nestedRoot).toHaveAttribute("data-rs-color-mode", "dark");
		await expect.element(html).toHaveAttribute("data-rs-color-mode", "light");
	});

	test("keyboard mode", async () => {
		const attribute = "data-rs-keyboard";
		await renderBare(
			<Reshaped theme="slate" defaultColorMode="dark">
				Hello
			</Reshaped>
		);

		await expect.element(html).not.toHaveAttribute(attribute);

		await userEvent.keyboard("{Tab}");
		await expect.element(html).toHaveAttribute(attribute);

		await userEvent.click(document.body);
		await expect.element(html).not.toHaveAttribute(attribute);
	});
});
