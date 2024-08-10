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

	it("renders children", () => {
		render(<Reshaped theme="reshaped">{fixtures.content}</Reshaped>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});

	it("applies RTL to html", () => {
		render(<Reshaped theme="reshaped" defaultRTL />);

		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	});

	it("applies light theme", () => {
		render(<Reshaped theme="reshaped" />);

		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("light");
	});

	it("applies dark theme", () => {
		render(<Reshaped theme="reshaped" defaultColorMode="dark" />);

		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("reshaped");
		expect(colorMode).toEqual("dark");
	});

	it("applies keyboard mode", async () => {
		const attribute = "data-rs-keyboard";
		render(<Reshaped theme="reshaped" />);

		expect(document.documentElement).not.toHaveAttribute(attribute);
		await userEvent.keyboard("{Tab}");
		expect(document.documentElement).toHaveAttribute(attribute);
		await userEvent.click(document.body);
		expect(document.documentElement).not.toHaveAttribute(attribute);
	});
});
