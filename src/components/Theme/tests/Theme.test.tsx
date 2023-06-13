import React from "react";
import { render, screen } from "@testing-library/react";
import Theme, { useTheme } from "components/Theme";

const Component = () => {
	const { colorMode } = useTheme();

	return <div>{colorMode}</div>;
};

describe("Utilities/Theme", () => {
	test("renders light mode", () => {
		render(
			<Theme name="reshaped">
				<Component />
			</Theme>
		);

		expect(screen.getByText("light")).toBeInTheDocument();
	});

	test("renders dark mode", () => {
		render(
			<Theme name="reshaped" colorMode="dark">
				<Component />
			</Theme>
		);

		expect(screen.getByText("dark")).toBeInTheDocument();
	});

	test("renders inverted mode", () => {
		render(
			<Theme name="reshaped" colorMode="inverted">
				<Component />
			</Theme>
		);

		expect(screen.getByText("dark")).toBeInTheDocument();
	});
});
