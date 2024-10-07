import getAlignStyles from "./index";

describe("Styles/Align", () => {
	test("handles value", () => {
		expect(getAlignStyles("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getAlignStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getAlignStyles({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
