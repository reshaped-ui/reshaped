import { expect, test, describe } from "vitest";

import minWidth from "./index";

describe("Styles/MinWidth", () => {
	test("handles px value", () => {
		expect(minWidth("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(minWidth("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(minWidth(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(minWidth()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(minWidth({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
