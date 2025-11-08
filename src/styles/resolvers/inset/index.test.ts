import { expect, test, describe } from "vitest";

import inset, {
	insetTop,
	insetBottom,
	insetStart,
	insetEnd,
	insetInline,
	insetBlock,
} from "./index";

describe("Styles/Inset", () => {
	test("handles positive value", () => {
		expect(inset(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(inset(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(inset()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(inset({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/Top", () => {
	test("handles positive value", () => {
		expect(insetTop(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetTop(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetTop()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetTop({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/Bottom", () => {
	test("handles positive value", () => {
		expect(insetBottom(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetBottom(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetBottom()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetBottom({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/Start", () => {
	test("handles positive value", () => {
		expect(insetStart(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetStart(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetStart()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetStart({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/End", () => {
	test("handles positive value", () => {
		expect(insetEnd(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetEnd(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetEnd()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetEnd({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/Inline", () => {
	test("handles positive value", () => {
		expect(insetInline(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetInline(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetInline()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetInline({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});

describe("Styles/Inset/Block", () => {
	test("handles positive value", () => {
		expect(insetBlock(4)).toMatchSnapshot();
	});

	test("handles 0 value", () => {
		expect(insetBlock(0)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(insetBlock()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(insetBlock({ s: 4, m: 0, l: 2 })).toMatchSnapshot();
	});
});
