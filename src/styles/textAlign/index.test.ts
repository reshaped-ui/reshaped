import getTextAlignStyles from "./index";

describe("Styles/TextAlign", () => {
	test("handles value", () => {
		expect(getTextAlignStyles("start")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(getTextAlignStyles()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(getTextAlignStyles({ s: "start", m: "center", l: "end" })).toMatchSnapshot();
	});
});
