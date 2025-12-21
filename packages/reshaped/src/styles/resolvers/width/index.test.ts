import { expect, test, describe } from "vitest";

import width from "./index";

describe("Styles/Width", () => {
	test("handles px value", () => {
		expect(width("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(width("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(width(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(width()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(width({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
