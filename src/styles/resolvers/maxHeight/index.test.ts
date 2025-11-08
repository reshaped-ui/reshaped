import { expect, test, describe } from "vitest";

import maxHeight from "./index";

describe("Styles/MaxHeight", () => {
	test("handles px value", () => {
		expect(maxHeight("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(maxHeight("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(maxHeight(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(maxHeight()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(maxHeight({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
