import { expect, test, describe } from "vitest";
import border from "./index";

describe("Styles/Border", () => {
	test("handles value", () => {
		expect(border("primary")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(border()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(border({ s: undefined, m: "neutral", l: "transparent" })).toMatchSnapshot();
	});
});
