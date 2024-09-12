import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MatchMediaMock from "jest-matchmedia-mock";
import Reshaped from "components/Reshaped";

// Render is used in every test because otherwise matchMedia mock is failing
let matchMedia: MatchMediaMock;

const fixtures = {
	content: "Content",
};

describe("Utilities/Reshaped", () => {
	beforeAll(() => {
		matchMedia = new MatchMediaMock();
	});

	afterEach(() => {
		matchMedia.clear();
	});

	test("renders children", () => {
		render(<Reshaped theme="reshaped">{fixtures.content}</Reshaped>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});

	test("applies RTL to html", () => {
		render(<Reshaped theme="reshaped" defaultRTL />);

		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	});

	test("applies light theme", () => {
		render(<Reshaped theme="reshaped" />);

		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("light");
	});

	test("applies dark theme", () => {
		render(<Reshaped theme="reshaped" defaultColorMode="dark" />);

		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("dark");
	});

	test("applies keyboard mode", async () => {
		const attribute = "data-rs-keyboard";
		render(<Reshaped theme="reshaped" />);

		expect(document.documentElement).not.toHaveAttribute(attribute);
		await userEvent.keyboard("{Tab}");
		expect(document.documentElement).toHaveAttribute(attribute);
		await userEvent.click(document.body);
		expect(document.documentElement).not.toHaveAttribute(attribute);
	});

	test("works in scoped mode", () => {
		render(<Reshaped theme="reshaped" scoped />);

		const rootEl = document.querySelector("[data-rs-root]");

		expect(rootEl).toBeInTheDocument();
		expect(rootEl).not.toBe(document.documentElement);
		expect(rootEl).toHaveAttribute("data-rs-theme", "reshaped");
		expect(document.documentElement).not.toHaveAttribute("data-rs-theme");
	});
});
