import { expect, test, describe } from "vitest";

import align from "./index";

describe("Styles/Align", () => {
	test("handles value", () => {
		expect(align("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(align()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(align({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
