import getMaxHeightStyles from "./index";

describe("Styles/MaxHeight", () => {
	test("handles px value", () => {
		expect(getMaxHeightStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getMaxHeightStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getMaxHeightStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getMaxHeightStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getMaxHeightStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
