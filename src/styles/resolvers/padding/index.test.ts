import { expect, test, describe } from "vitest";
import padding from "./index";

describe("Styles/Padding", () => {
	test("handles positive value", () => {
		expect(padding(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(padding(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(padding()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(padding({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
