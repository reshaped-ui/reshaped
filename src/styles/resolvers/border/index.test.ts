import { expect, test, describe } from "vitest";
import getBorderStyles from "./index";

describe("Styles/Border", () => {
	test("handles value", () => {
		expect(getBorderStyles("primary")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getBorderStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getBorderStyles({ s: undefined, m: "neutral", l: "transparent" })).toMatchSnapshot();
	});
});
