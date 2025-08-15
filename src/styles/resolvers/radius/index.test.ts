import { expect, test, describe } from "vitest";
import getRadiusStyles from "./index";

describe("Styles/Radius", () => {
	test("handles value", () => {
		expect(getRadiusStyles("large")).toMatchSnapshot();
	});

	test("handles none", () => {
		expect(getRadiusStyles("none")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getRadiusStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getRadiusStyles({ s: "small", m: "none", l: "circular" })).toMatchSnapshot();
	});
});
