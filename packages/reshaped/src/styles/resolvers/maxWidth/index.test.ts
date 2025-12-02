import { expect, test, describe } from "vitest";

import maxWidth from "./index";

describe("Styles/MaxWidth", () => {
	test("handles px value", () => {
		expect(maxWidth("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(maxWidth("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(maxWidth(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(maxWidth()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(maxWidth({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
