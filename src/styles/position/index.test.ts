import getPositionStyles from "./index";

describe("Styles/Position", () => {
	test("handles value", () => {
		expect(getPositionStyles("absolute")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getPositionStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getPositionStyles({ s: "absolute", l: "fixed" })).toMatchSnapshot();
	});
});
