import { expect, test, describe } from "vitest";

import minHeight from "./index";

describe("Styles/MinHeight", () => {
	test("handles px value", () => {
		expect(minHeight("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(minHeight("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(minHeight(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(minHeight()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(minHeight({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
