import { expect, test, describe } from "vitest";

import textAlign from "./index";

describe("Styles/TextAlign", () => {
	test("handles value", () => {
		expect(textAlign("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(textAlign()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(textAlign({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
