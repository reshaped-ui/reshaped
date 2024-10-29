import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Reshaped from "components/Reshaped";
import Theme, { useTheme } from "components/Theme";

const Component = () => {
	const { colorMode } = useTheme();

	return <div>{colorMode}</div>;
};

describe("Utilities/Theme", () => {
	test("renders light mode", () => {
		render(
			<Reshaped>
				<Theme name="reshaped">
					<Component />
				</Theme>
			</Reshaped>
		);

		expect(screen.getByText("light")).toBeInTheDocument();
	});

	test("renders dark mode", () => {
		render(
			<Reshaped>
				<Theme name="reshaped" colorMode="dark">
					<Component />
				</Theme>
			</Reshaped>
		);

		expect(screen.getByText("dark")).toBeInTheDocument();
	});

	test("renders inverted mode", () => {
		render(
			<Reshaped>
				<Theme name="reshaped" colorMode="inverted">
					<Component />
				</Theme>
			</Reshaped>
		);

		expect(screen.getByText("dark")).toBeInTheDocument();
	});

	test("changes parent theme", async () => {
		const Component = () => {
			const { theme, rootTheme, setTheme } = useTheme();

			return (
				<button data-theme={theme} data-root-theme={rootTheme} onClick={() => setTheme("foo")} />
			);
		};

		render(
			<Reshaped defaultTheme="reshaped">
				<Theme defaultName="slate" colorMode="inverted">
					<Component />
				</Theme>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toHaveAttribute("data-theme", "slate");
		expect(button).toHaveAttribute("data-root-theme", "reshaped");

		await userEvent.click(button);

		expect(button).toHaveAttribute("data-theme", "foo");
		expect(button).toHaveAttribute("data-root-theme", "reshaped");
	});

	test("changes root theme", async () => {
		const Component = () => {
			const { theme, rootTheme, setRootTheme } = useTheme();

			return (
				<button
					data-theme={theme}
					data-root-theme={rootTheme}
					onClick={() => setRootTheme("foo")}
				/>
			);
		};

		render(
			<Reshaped defaultTheme="reshaped">
				<Theme defaultName="slate" colorMode="inverted">
					<Component />
				</Theme>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toHaveAttribute("data-theme", "slate");
		expect(button).toHaveAttribute("data-root-theme", "reshaped");

		await userEvent.click(button);

		expect(button).toHaveAttribute("data-theme", "slate");
		expect(button).toHaveAttribute("data-root-theme", "foo");
	});
});
