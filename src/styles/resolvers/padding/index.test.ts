import { expect, test, describe } from "vitest";

import padding, {
	paddingBlock,
	paddingBottom,
	paddingEnd,
	paddingInline,
	paddingStart,
	paddingTop,
} from "./index";

describe("Styles/Padding", () => {
	test("handles positive value", () => {
		expect(padding(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(padding(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(padding()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(padding({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/Top", () => {
	test("handles positive value", () => {
		expect(paddingTop(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingTop(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingTop()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingTop({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/Bottom", () => {
	test("handles positive value", () => {
		expect(paddingBottom(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingBottom(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingBottom()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingBottom({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/Start", () => {
	test("handles positive value", () => {
		expect(paddingStart(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingStart(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingStart()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingStart({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/End", () => {
	test("handles positive value", () => {
		expect(paddingEnd(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingEnd(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingEnd()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingEnd({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/Inline", () => {
	test("handles positive value", () => {
		expect(paddingInline(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingInline(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingInline()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingInline({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Padding/Block", () => {
	test("handles positive value", () => {
		expect(paddingBlock(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(paddingBlock(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(paddingBlock()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(paddingBlock({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
