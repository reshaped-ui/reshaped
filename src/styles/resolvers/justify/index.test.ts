import { expect, test, describe } from "vitest";
import getJustifyStyles from "./index";

describe("Styles/Justify", () => {
	test("handles value", () => {
		expect(getJustifyStyles("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getJustifyStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getJustifyStyles({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
