import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "components/Slider";

const fixtures = {
	className: "test-className",
	id: "test-id",
	min: 5,
	minValue: 11,
	maxValue: 20,
	max: 30,
	step: 5,
	name: "slider",
};

describe("Components/Slider", () => {
	test("works as single uncontrolled", () => {
		const handleChange = jest.fn();
		const handleChangeCommit = jest.fn();
		render(
			<Slider
				name={fixtures.name}
				defaultValue={fixtures.maxValue}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);

		const inputEl = screen.getByRole("slider");

		expect(inputEl).toHaveValue(fixtures.maxValue.toString());

		// input type range doesn't support keyboard events in jsdom yet
		// so triggering change manually
		fireEvent.change(inputEl, { target: { value: fixtures.maxValue + 1 } });

		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith({ value: fixtures.maxValue + 1, name: fixtures.name });
		expect(inputEl).toHaveValue((fixtures.maxValue + 1).toString());
	});

	test("works as single controlled", () => {
		const handleChange = jest.fn();
		const handleChangeCommit = jest.fn();
		render(
			<Slider
				name={fixtures.name}
				value={fixtures.maxValue}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);

		const inputEl = screen.getByRole("slider");

		expect(inputEl).toHaveValue(fixtures.maxValue.toString());

		// input type range doesn't support keyboard events in jsdom yet
		// so triggering change manually
		fireEvent.change(inputEl, { target: { value: fixtures.maxValue + 1 } });

		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith({ value: fixtures.maxValue + 1, name: fixtures.name });
		expect(inputEl).toHaveValue(fixtures.maxValue.toString());
	});

	test("works as range uncontrolled", () => {
		const handleChange = jest.fn();
		const handleChangeCommit = jest.fn();
		render(
			<Slider
				range
				name={fixtures.name}
				defaultMinValue={fixtures.minValue}
				defaultMaxValue={fixtures.maxValue}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);

		const [minInputEl, maxInputEl] = screen.getAllByRole("slider");

		expect(minInputEl).toHaveValue(fixtures.minValue.toString());
		expect(maxInputEl).toHaveValue(fixtures.maxValue.toString());

		// input type range doesn't support keyboard events in jsdom yet
		// so triggering change manually
		fireEvent.change(minInputEl, { target: { value: fixtures.minValue + 1 } });

		expect(handleChange).toBeCalledTimes(1);
		expect(handleChange).toBeCalledWith({
			minValue: fixtures.minValue + 1,
			maxValue: fixtures.maxValue,
			name: fixtures.name,
		});

		expect(minInputEl).toHaveValue((fixtures.minValue + 1).toString());
		expect(maxInputEl).toHaveValue(fixtures.maxValue.toString());
	});

	test("applies min and max values applied", () => {
		render(
			<Slider
				name={fixtures.name}
				range
				min={fixtures.min}
				max={fixtures.max}
				step={fixtures.step}
			/>
		);

		const [minInputEl, maxInputEl] = screen.getAllByRole("slider");

		expect(minInputEl).toHaveAttribute("min", fixtures.min.toString());
		expect(minInputEl).toHaveAttribute("max", fixtures.max.toString());
		expect(maxInputEl).toHaveAttribute("min", fixtures.min.toString());
		expect(maxInputEl).toHaveAttribute("max", fixtures.max.toString());
	});

	test("renders with integer step applied", () => {
		render(<Slider name={fixtures.name} defaultValue={11} step={5} />);

		const inputEl = screen.getByRole("slider");
		expect(inputEl).toHaveValue("10");
	});

	test("renders with float step applied", () => {
		render(<Slider name={fixtures.name} defaultValue={20.24} step={0.1} />);

		const inputEl = screen.getByRole("slider");
		expect(inputEl).toHaveValue("20.2");
	});

	test("renders custom tooltip value", () => {
		render(
			<Slider
				name={fixtures.name}
				defaultValue={fixtures.minValue}
				renderValue={(args) => `$${args.value}`}
			/>
		);

		const tooltipEl = screen.getByText(`$${fixtures.minValue}`);
		expect(tooltipEl).toBeInTheDocument();
	});

	test("doesn't render tooltip", () => {
		render(<Slider name={fixtures.name} defaultValue={fixtures.minValue} renderValue={false} />);

		const tooltipEl = screen.queryByText(`$${fixtures.minValue}`);
		expect(tooltipEl).not.toBeInTheDocument();
	});

	test("disables the slider", () => {
		render(<Slider name={fixtures.name} defaultValue={fixtures.minValue} disabled />);

		const inputEl = screen.getByRole("slider");
		expect(inputEl).toBeDisabled();
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Slider
				name="slider"
				className={fixtures.className}
				attributes={{ "data-id": fixtures.id }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);
	});
});
