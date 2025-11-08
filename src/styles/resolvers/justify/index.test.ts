import { expect, test, describe } from "vitest";

import justify from "./index";

describe("Styles/Justify", () => {
	test("handles value", () => {
		expect(justify("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(justify()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(justify({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
