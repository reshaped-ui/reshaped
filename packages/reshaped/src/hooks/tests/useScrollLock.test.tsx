import React from "react";
import { describe, expect, test } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useScrollLock from "../useScrollLock";

const Base = () => {
	const { lockScroll, unlockScroll, scrollLocked } = useScrollLock();

	return (
		<>
			<button onClick={scrollLocked ? unlockScroll : lockScroll}>
				{scrollLocked ? "Unlock" : "Lock"}
			</button>
			<div style={{ height: "150vh" }} />
		</>
	);
};

const Origin = () => {
	const originRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll, scrollLocked } = useScrollLock({ originRef });

	return (
		<div style={{ overflow: "auto", height: 100 }} ref={originRef} data-testid="root">
			<div style={{ height: 200 }}>
				<button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</button>
			</div>
		</div>
	);
};

const Container = () => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll, scrollLocked } = useScrollLock({ containerRef });

	return (
		<div style={{ overflow: "auto", height: 100 }} ref={containerRef} data-testid="root">
			<button onClick={scrollLocked ? unlockScroll : lockScroll}>Toggle</button>
		</div>
	);
};

const ContainerLockedCount = () => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const globalLock = useScrollLock();
	const scopedLock = useScrollLock({ containerRef });

	return (
		<div style={{ display: "flex", gap: 16 }} ref={containerRef}>
			<button onClick={globalLock.scrollLocked ? globalLock.unlockScroll : globalLock.lockScroll}>
				Global
			</button>
			<button onClick={scopedLock.scrollLocked ? scopedLock.unlockScroll : scopedLock.lockScroll}>
				Scoped
			</button>
		</div>
	);
};

const html = () => document.documentElement;
const body = () => document.body;

describe("Hooks/useScrollLock", () => {
	test("base", async () => {
		await render(<Base />);

		await userEvent.click(page.getByRole("button", { name: "Lock" }));

		await expect.element(html()).toHaveStyle("overflow: hidden");
		await expect.element(page.getByRole("button", { name: "Unlock" })).toBeInTheDocument();

		await userEvent.click(page.getByRole("button", { name: "Unlock" }));

		await expect.element(html()).not.toHaveStyle("overflow: hidden");
		await expect.element(page.getByRole("button", { name: "Lock" })).toBeInTheDocument();
	});

	test("originRef", async () => {
		await render(<Origin />);
		const button = page.getByRole("button");
		const root = page.getByTestId("root");

		await userEvent.click(button);

		await expect.element(root).toHaveStyle("overflow: hidden");
		await expect.element(body()).not.toHaveStyle("overflow: hidden");

		await userEvent.click(button);

		await expect.element(root).not.toHaveStyle("overflow: hidden");
	});

	test("containerRef", async () => {
		await render(<Container />);
		const button = page.getByRole("button");
		const root = page.getByTestId("root");

		await userEvent.click(button);

		await expect.element(root).toHaveStyle("overflow: hidden");
		await expect.element(body()).not.toHaveStyle("overflow: hidden");

		await userEvent.click(button);

		await expect.element(root).not.toHaveStyle("overflow: hidden");
	});

	test("containerRef locked count", async () => {
		await render(<ContainerLockedCount />);
		const buttonGlobal = page.getByRole("button", { name: "Global" });
		const buttonScoped = page.getByRole("button", { name: "Scoped" });

		await userEvent.click(buttonGlobal);
		await expect.element(html()).toHaveStyle("overflow: hidden");

		// Scoped lock doesn't keep the global lock active
		await userEvent.click(buttonScoped);
		await userEvent.click(buttonGlobal);

		await expect.element(html()).not.toHaveStyle("overflow: hidden");

		await userEvent.click(buttonScoped);
	});
});
