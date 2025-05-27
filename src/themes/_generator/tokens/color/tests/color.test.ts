// import { expect, test, describe } from "vitest";
// import { getOnColor } from "../../../utilities/color";

// describe("cli/utilities/color", () => {
// 	describe("wcag", () => {
// 		test("returns white for black background", () => {
// 			expect(getOnColor({ bgHexColor: "#000000", mode: "light" })).toBe("#ffffff");
// 		});

// 		test("returns white for dark colored background", () => {
// 			expect(getOnColor({ bgHexColor: "#aa0000", mode: "light" })).toBe("#ffffff");
// 		});

// 		test("returns black for white background", () => {
// 			expect(getOnColor({ bgHexColor: "#ffffff", mode: "light" })).toBe("#000000");
// 		});

// 		test("returns white for light colored background", () => {
// 			expect(getOnColor({ bgHexColor: "#dedede", mode: "light" })).toBe("#000000");
// 		});

// 		test("returns #999 for white background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#ffffff",
// 					lightHexColor: "#eeeeee",
// 					darkHexColor: "#999999",
// 					mode: "dark",
// 				})
// 			).toBe("#999999");
// 		});

// 		test("returns #eee for black background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#000000",
// 					lightHexColor: "#eeeeee",
// 					darkHexColor: "#999999",
// 					mode: "dark",
// 				})
// 			).toBe("#eeeeee");
// 		});

// 		test("returns black for muted green background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#1abc9c",
// 					mode: "dark",
// 				})
// 			).toBe("#000000");
// 		});
// 	});

// 	describe("apca", () => {
// 		test("returns white for black background", () => {
// 			expect(getOnColor({ bgHexColor: "#000000", mode: "light", algorithm: "apca" })).toBe(
// 				"#ffffff"
// 			);
// 		});

// 		test("returns white for dark colored background", () => {
// 			expect(getOnColor({ bgHexColor: "#aa0000", mode: "light", algorithm: "apca" })).toBe(
// 				"#ffffff"
// 			);
// 		});

// 		test("returns black for white background", () => {
// 			expect(getOnColor({ bgHexColor: "#ffffff", mode: "light", algorithm: "apca" })).toBe(
// 				"#000000"
// 			);
// 		});

// 		test("returns white for light colored background", () => {
// 			expect(getOnColor({ bgHexColor: "#dedede", mode: "light", algorithm: "apca" })).toBe(
// 				"#000000"
// 			);
// 		});

// 		test("returns #999 for white background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#ffffff",
// 					lightHexColor: "#eeeeee",
// 					darkHexColor: "#999999",
// 					mode: "dark",
// 					algorithm: "apca",
// 				})
// 			).toBe("#999999");
// 		});

// 		test("returns #eee for black background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#000000",
// 					lightHexColor: "#eeeeee",
// 					darkHexColor: "#999999",
// 					mode: "dark",
// 					algorithm: "apca",
// 				})
// 			).toBe("#eeeeee");
// 		});

// 		test("returns white for muted green background", () => {
// 			expect(
// 				getOnColor({
// 					bgHexColor: "#1abc9c",
// 					mode: "dark",
// 					algorithm: "apca",
// 				})
// 			).toBe("#ffffff");
// 		});
// 	});
// });
