import { expect, test, describe } from "vitest";

import margin, {
	marginBlock,
	marginBottom,
	marginEnd,
	marginInline,
	marginStart,
	marginTop,
} from "./index";

describe("Styles/Margin", () => {
	test("handles positive value", () => {
		expect(margin(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(margin(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(margin()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(margin({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/Top", () => {
	test("handles positive value", () => {
		expect(marginTop(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginTop(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginTop()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginTop({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/Bottom", () => {
	test("handles positive value", () => {
		expect(marginBottom(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginBottom(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginBottom()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginBottom({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/Start", () => {
	test("handles positive value", () => {
		expect(marginStart(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginStart(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginStart()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginStart({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/End", () => {
	test("handles positive value", () => {
		expect(marginEnd(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginEnd(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginEnd()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginEnd({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/Inline", () => {
	test("handles positive value", () => {
		expect(marginInline(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginInline(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginInline()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginInline({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Margin/Block", () => {
	test("handles positive value", () => {
		expect(marginBlock(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(marginBlock(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(marginBlock()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(marginBlock({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
