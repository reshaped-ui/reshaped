import getWidthStyles from "./index";

describe("Styles/Width", () => {
	test("handles px value", () => {
		expect(getWidthStyles("50px")).toMatchSnapshot();
	});

	test("handles % value", () => {
		expect(getWidthStyles("50%")).toMatchSnapshot();
	});

	test("handles unit value", () => {
		expect(getWidthStyles(5)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getWidthStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getWidthStyles({ s: "50px", l: "50%" })).toMatchSnapshot();
	});
});
