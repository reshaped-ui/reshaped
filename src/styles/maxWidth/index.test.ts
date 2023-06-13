import getMaxWidthStyles from "./index";

describe("Styles/MaxWidth", () => {
	test("handles px value", () => {
		expect(getMaxWidthStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getMaxWidthStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getMaxWidthStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getMaxWidthStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getMaxWidthStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
