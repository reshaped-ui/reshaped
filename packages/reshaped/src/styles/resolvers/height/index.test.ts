import { expect, test, describe } from "vitest";

import height from "./index";

describe("Styles/Height", () => {
	test("handles px value", () => {
		expect(height("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(height("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(height(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(height()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(height({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
