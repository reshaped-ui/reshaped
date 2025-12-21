import { expect, test, describe } from "vitest";

import generateColors from "../generateColors";

describe("themes/tokens/color/utilities/generateColors", () => {
	test("with default values", () => {
		expect(generateColors()).toMatchSnapshot();
	});

	test("with a passed value", () => {
		const black = { l: 0, c: 0, h: 0 };
		const colors = generateColors({ primary: { oklch: black } });

		expect(colors).toMatchSnapshot();
		expect(colors.backgroundPrimary).toEqual({
			oklch: { ...black, mode: "oklch" },
			oklchDark: { ...black, l: 1, mode: "oklch" },
		});
	});
});
