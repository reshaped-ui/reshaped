import getInsetStyles from "./index";

describe("Styles/Inset", () => {
	test("handles positive value", () => {
		expect(getInsetStyles(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(getInsetStyles(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getInsetStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getInsetStyles({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});

	test("handles value width defined side", () => {
		expect(getInsetStyles(4, "start")).toMatchSnapshot();
	});
});
