import { expect, test, describe } from "vitest";

import { hexToOklch, oklchToRgb, tokenToOklchToken } from "../convert";

const white = hexToOklch("#ffffff");
const black = hexToOklch("#000000");
const red = hexToOklch("#ff0000");

describe("themes/tokens/color/utilities/convert", () => {
	describe("hexToOklch", () => {
		test("white", () => {
			expect(white).toMatchSnapshot();
		});

		test("black", () => {
			expect(black).toMatchSnapshot();
		});

		test("red", () => {
			expect(red).toMatchSnapshot();
		});

		test("white, short", () => {
			expect(hexToOklch("#fff")).toEqual(white);
		});
	});

	describe("oklchToRgb", () => {
		test("white", () => {
			expect(oklchToRgb(white)).toMatchSnapshot();
		});

		test("black", () => {
			expect(oklchToRgb(black)).toMatchSnapshot();
		});

		test("red", () => {
			expect(oklchToRgb(red)).toMatchSnapshot();
		});
	});

	describe("tokenToOklchToken", () => {
		test("hex", () => {
			expect(tokenToOklchToken({ hex: "#ffffff" })).toMatchSnapshot();
		});

		test("hex and hexDark", () => {
			expect(tokenToOklchToken({ hex: "#ffffff", hexDark: "#000000" })).toMatchSnapshot();
		});

		test("oklch", () => {
			expect(tokenToOklchToken({ oklch: white })).toMatchSnapshot();
		});

		test("oklch and oklchDark", () => {
			expect(tokenToOklchToken({ oklch: white, oklchDark: black })).toMatchSnapshot();
		});
	});
});
