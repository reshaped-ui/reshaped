import generateColors from "../generateColors";

describe("Themes/Utilties/generateColors", () => {
	test("generate the default theme", () => {
		const colors = generateColors();

		expect(colors).toMatchSnapshot();
	});

	test("applies color overrides", () => {
		const colors = generateColors({
			primary: "#2563eb",
			critical: "#dc2626",
			positive: "#16a34a",
		});

		expect(colors).toMatchSnapshot();
	});
});
