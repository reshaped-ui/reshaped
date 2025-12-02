import { expect, test, describe } from "vitest";

import border, {
	borderTop,
	borderBottom,
	borderStart,
	borderEnd,
	borderInline,
	borderBlock,
	borderColor,
} from "./index";

describe("Styles/BorderColor", () => {
	test("handles value", () => {
		expect(borderColor("primary")).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderColor()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderColor({ s: undefined, m: "neutral", l: "transparent" })).toMatchSnapshot();
	});
});

describe("Styles/Border", () => {
	test("handles true value", () => {
		expect(border(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(border(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(border()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(border({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderTop", () => {
	test("handles true value", () => {
		expect(borderTop(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderTop(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderTop()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderTop({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderBottom", () => {
	test("handles true value", () => {
		expect(borderBottom(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderBottom(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderBottom()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderBottom({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderStart", () => {
	test("handles true value", () => {
		expect(borderStart(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderStart(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderStart()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderStart({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderEnd", () => {
	test("handles true value", () => {
		expect(borderEnd(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderEnd(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderEnd()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderEnd({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderInline", () => {
	test("handles true value", () => {
		expect(borderInline(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderInline(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderInline()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderInline({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});

describe("Styles/BorderBlock", () => {
	test("handles true value", () => {
		expect(borderBlock(true)).toMatchSnapshot();
	});

	test("handles false value", () => {
		expect(borderBlock(false)).toMatchSnapshot();
	});

	test("handles undefined value", () => {
		expect(borderBlock()).toMatchSnapshot();
	});

	test("handles responsive value", async () => {
		expect(borderBlock({ s: true, m: false, l: true })).toMatchSnapshot();
	});
});
