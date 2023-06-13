import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type Renderer<P> = (props: P) => React.ReactElement;

export const testChildren = (renderer: Renderer<{ children: React.ReactNode }>) => {
	test("renders children", () => {
		render(renderer({ children: "Children" }));
		expect(screen.getByText("Children")).toBeInTheDocument();
	});
};

export const testLinkBehavior = (renderer: Renderer<{ href: string }>) => {
	test("works as a link", () => {
		render(renderer({ href: "https://reshaped.so" }));

		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link.getAttribute("href")).toBe("https://reshaped.so");
	});
};

export const testLinkButtonBehavior = (
	renderer: Renderer<{ href: string; onClick: () => void }>
) => {
	test("works as a button with href", async () => {
		const noop = jest.fn();
		render(renderer({ onClick: noop, href: "https://reshaped.so" }));
		const button = screen.getByRole("link");
		button.addEventListener("click", (e) => e.preventDefault());
		expect(button).toBeInTheDocument();
		await userEvent.click(button);
		expect(noop).toBeCalledTimes(1);
	});
};

export const testButtonBehavior = (renderer: Renderer<{ onClick: () => void }>) => {
	test("works as a button", async () => {
		const noop = jest.fn();
		render(renderer({ onClick: noop }));

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		await userEvent.click(button);
		expect(noop).toBeCalledTimes(1);
		// fireEvent.keyDown(button, { key: "Enter" });
		// expect(noop).toBeCalledTimes(2);
		// fireEvent.keyDown(button, { key: " " });
		// expect(noop).toBeCalledTimes(3);
	});
};

export const testButtonType = (renderer: Renderer<{ type: string }>) => {
	test("applies correct button type", async () => {
		const noop = jest.fn();
		render(<form onSubmit={noop}>{renderer({ type: "button" })}</form>);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(noop).not.toBeCalled();
	});
};

export const testDisabledButton = (renderer: Renderer<{ onClick: () => void }>) => {
	test("disables the button", async () => {
		const noop = jest.fn();
		render(renderer({ onClick: noop }));

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(noop).not.toBeCalled();
	});
};

export const testAriaLabel = (renderer: Renderer<{ ariaLabel: string }>) => {
	test("renders aria-label", () => {
		render(renderer({ ariaLabel: "Hey" }));

		const button = screen.getByRole("button");
		expect(button.getAttribute("aria-label")).toBeDefined();
	});
};
