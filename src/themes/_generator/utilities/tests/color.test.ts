import { getOnColor } from "../color";

describe("cli/utilities/color", () => {
	// test("returns white for black background", () => {
	// 	expect(getOnColor({ bgHexColor: "#000000", mode: "light" })).toBe("#ffffff");
	// });
	// test("returns white for dark colored background", () => {
	// 	expect(getOnColor({ bgHexColor: "#aa0000", mode: "light" })).toBe("#ffffff");
	// });
	// test("returns black for white background", () => {
	// 	expect(getOnColor({ bgHexColor: "#ffffff", mode: "light" })).toBe("#000000");
	// });
	// test("returns white for light colored background", () => {
	// 	expect(getOnColor({ bgHexColor: "#dedede", mode: "light" })).toBe("#000000");
	// });
	// /**
	//  * 8-digit hex
	//  */
	// test("returns black for dark background with alpha: 0", () => {
	// 	expect(getOnColor({ bgHexColor: "#00000000", mode: "light" })).toBe("#000000");
	// });
	// test("returns black for light background with alpha: 0", () => {
	// 	expect(getOnColor({ bgHexColor: "#ffffff00", mode: "light" })).toBe("#000000");
	// });
	// test("returns black for dark background with alpha: 25%", () => {
	// 	expect(getOnColor({ bgHexColor: "#00000040", mode: "light" })).toBe("#000000");
	// });
	// test("returns white for dark background with alpha: 30%", () => {
	// 	expect(getOnColor({ bgHexColor: "#0000004D", mode: "light" })).toBe("#ffffff");
	// });
	// /**
	//  * Dark mode
	//  */
	// test("returns black for white background in dark mode", () => {
	// 	expect(getOnColor({ bgHexColor: "#ffffff", mode: "dark" })).toBe("#000000");
	// });
	// test("returns white for dark background with alpha: 25% in dark mode", () => {
	// 	expect(getOnColor({ bgHexColor: "#00000040", mode: "dark" })).toBe("#ffffff");
	// });
	// test("returns white for dark background with alpha: 0 in dark mode", () => {
	// 	expect(getOnColor({ bgHexColor: "#00000000", mode: "dark" })).toBe("#ffffff");
	// });
	// /**
	//  * Custom resolved color
	//  */
	// test("returns #999 for white background in dark mode", () => {
	// 	expect(
	// 		getOnColor({
	// 			bgHexColor: "#ffffff",
	// 			mode: "dark",
	// 			lightHexColor: "#eeeeee",
	// 			darkHexColor: "#999999",
	// 		})
	// 	).toBe("#999999");
	// });
	// test("returns #eee for black background in dark mode", () => {
	// 	expect(
	// 		getOnColor({
	// 			bgHexColor: "#000000",
	// 			mode: "dark",
	// 			lightHexColor: "#eeeeee",
	// 			darkHexColor: "#999999",
	// 		})
	// 	).toBe("#eeeeee");
	// });
});
