import { expect, test, describe } from "vitest";

import { getOnColor } from "../a11y";

const white = { l: 1, c: 0, h: 0, mode: "oklch" } as const;
const black = { l: 0, c: 0, h: 0, mode: "oklch" } as const;
const blue = { l: 0.55, c: 0.24, h: 262.67, mode: "oklch" } as const;
const rose = { l: 0.64, c: 0.2, h: 16.5, mode: "oklch" } as const;

describe("themes/tokens/color/utilities/a11y", () => {
	describe("wcag", () => {
		test("returns white for black background", () => {
			expect(getOnColor({ bgColor: black, lightColor: white, darkColor: black })).toBe(white);
		});

		test("returns black for white background", () => {
			expect(getOnColor({ bgColor: white, lightColor: white, darkColor: black })).toBe(black);
		});

		test("returns white for blue background", () => {
			expect(getOnColor({ bgColor: blue, lightColor: white, darkColor: black })).toBe(white);
		});

		test("returns black for rose background", () => {
			expect(getOnColor({ bgColor: rose, lightColor: white, darkColor: black })).toBe(black);
		});
	});

	describe("apca", () => {
		test("returns white for black background", () => {
			expect(
				getOnColor({ bgColor: black, lightColor: white, darkColor: black, algorithm: "apca" })
			).toBe(white);
		});

		test("returns black for white background", () => {
			expect(
				getOnColor({ bgColor: white, lightColor: white, darkColor: black, algorithm: "apca" })
			).toBe(black);
		});

		test("returns white for blue background", () => {
			expect(
				getOnColor({ bgColor: blue, lightColor: white, darkColor: black, algorithm: "apca" })
			).toBe(white);
		});

		test("returns white for rose background", () => {
			expect(
				getOnColor({ bgColor: rose, lightColor: white, darkColor: black, algorithm: "apca" })
			).toBe(white);
		});
	});
});
