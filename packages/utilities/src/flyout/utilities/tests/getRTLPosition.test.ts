import { describe, expect, test } from "vitest";

import getRTLPosition from "../getRTLPosition";

describe("flyout/getRTLPosition", () => {
	test("keeps top position", () => {
		expect(getRTLPosition("top")).toEqual("top");
	});

	test("mirrors top-start position", () => {
		expect(getRTLPosition("top-start")).toEqual("top-end");
	});

	test("mirrors start position", () => {
		expect(getRTLPosition("start")).toEqual("end");
	});

	test("mirrors end position", () => {
		expect(getRTLPosition("end")).toEqual("start");
	});

	test("mirrors bottom-end position", () => {
		expect(getRTLPosition("bottom-end")).toEqual("bottom-start");
	});
});
