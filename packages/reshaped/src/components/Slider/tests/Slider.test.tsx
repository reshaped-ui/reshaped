import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Slider from "@/components/Slider";
import { render } from "@/tests/render";

const THUMB_SIZE = 16;

/**
 * Same as fireEvent.change: sets the value through the native setter so React picks up the change
 */
const changeValue = (el: HTMLInputElement, value: number) => {
	const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;

	setter.call(el, String(value));
	el.dispatchEvent(new Event("change", { bubbles: true }));
};

const getSliders = () => page.getByRole("slider").elements() as HTMLInputElement[];

/**
 * Returns clientX for the percentage position of the thumb, matching the Slider position calculation
 */
const getClientX = (root: HTMLElement, percentage: number) => {
	const bar = root.firstElementChild as HTMLElement;
	const rect = bar.getBoundingClientRect();

	return rect.left + THUMB_SIZE / 2 + (bar.clientWidth - THUMB_SIZE) * percentage;
};

describe("Components/Slider", () => {
	test("name, minName, maxName, range", async () => {
		await render(
			<>
				<Slider name="slider-single" defaultValue={30} />
				<Slider range name="slider-range" defaultMinValue={30} defaultMaxValue={85} />
				<Slider
					range
					minName="slider-min"
					maxName="slider-max"
					defaultMinValue={30}
					defaultMaxValue={85}
				/>
			</>
		);
		const inputs = page.getByRole("slider");

		await expect.element(inputs.nth(0)).toHaveAttribute("name", "slider-single");
		await expect.element(inputs.nth(1)).toHaveAttribute("name", "slider-range");
		await expect.element(inputs.nth(2)).toHaveAttribute("name", "slider-range");
		await expect.element(inputs.nth(3)).toHaveAttribute("name", "slider-min");
		await expect.element(inputs.nth(4)).toHaveAttribute("name", "slider-max");
	});

	test("min, max", async () => {
		await render(<Slider name="name" min={50} max={70} defaultValue={60} />);
		const input = page.getByRole("slider");

		await expect.element(input).toHaveAttribute("min", "50");
		await expect.element(input).toHaveAttribute("max", "70");
		await expect.element(input).toHaveValue("60");

		changeValue(getSliders()[0], 30);
		await expect.element(input).toHaveValue("50");

		changeValue(getSliders()[0], 80);
		await expect.element(input).toHaveValue("70");
	});

	test("min, max, defaultValue out of bounds", async () => {
		await render(
			<>
				<Slider name="name" min={50} max={70} defaultValue={30} />
				<Slider name="name" min={50} max={70} defaultValue={80} />
			</>
		);
		const inputs = page.getByRole("slider");

		await expect.element(inputs.nth(0)).toHaveValue("50");
		await expect.element(inputs.nth(1)).toHaveValue("70");
	});

	test("step", async () => {
		await render(
			<>
				<Slider name="slider" defaultValue={30} step={5} />
				<Slider name="slider" defaultValue={31} step={5} />
			</>
		);
		const inputs = page.getByRole("slider");

		await expect.element(inputs.nth(0)).toHaveValue("30");

		changeValue(getSliders()[0], 31);
		await expect.element(inputs.nth(0)).toHaveValue("30");

		changeValue(getSliders()[0], 34);
		await expect.element(inputs.nth(0)).toHaveValue("35");

		// defaultValue is rounded to the step
		await expect.element(inputs.nth(1)).toHaveValue("30");
	});

	test("defaultValue, onChange, onChangeCommit", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		await render(
			<Slider
				name="test-name"
				defaultValue={50}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);
		const input = page.getByRole("slider");

		await expect.element(input).toHaveValue("50");

		changeValue(getSliders()[0], 51);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ value: 51, name: "test-name" });

		expect(handleChangeCommit).toHaveBeenCalledTimes(1);
		expect(handleChangeCommit).toHaveBeenCalledWith({ value: 51, name: "test-name" });

		await expect.element(input).toHaveValue("51");
	});

	test("value, onChange, onChangeCommit", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		await render(
			<Slider
				name="test-name"
				value={50}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);
		const input = page.getByRole("slider");

		await expect.element(input).toHaveValue("50");

		changeValue(getSliders()[0], 51);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ value: 51, name: "test-name" });

		expect(handleChangeCommit).toHaveBeenCalledTimes(1);
		expect(handleChangeCommit).toHaveBeenCalledWith({ value: 51, name: "test-name" });

		// Still the same because it's controlled
		await expect.element(input).toHaveValue("50");
	});

	test("range, defaultValue, onChange, onChangeCommit", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		await render(
			<Slider
				range
				name="test-name"
				defaultMinValue={50}
				defaultMaxValue={70}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);
		const minInput = page.getByRole("slider").nth(0);
		const maxInput = page.getByRole("slider").nth(1);
		const expectedArgs = {
			minValue: 51,
			maxValue: 70,
			name: "test-name",
			minName: "test-name",
			maxName: "test-name",
		};

		await expect.element(minInput).toHaveValue("50");
		await expect.element(maxInput).toHaveValue("70");

		changeValue(getSliders()[0], 51);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expectedArgs);

		expect(handleChangeCommit).toHaveBeenCalledTimes(1);
		expect(handleChangeCommit).toHaveBeenCalledWith(expectedArgs);

		await expect.element(minInput).toHaveValue("51");
		await expect.element(maxInput).toHaveValue("70");
	});

	test("range, value, onChange, onChangeCommit, minName, maxName", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		await render(
			<Slider
				range
				minName="test-name-min"
				maxName="test-name-max"
				minValue={50}
				maxValue={70}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);
		const minInput = page.getByRole("slider").nth(0);
		const maxInput = page.getByRole("slider").nth(1);
		const expectedArgs = {
			minValue: 51,
			maxValue: 70,
			minName: "test-name-min",
			maxName: "test-name-max",
		};

		await expect.element(minInput).toHaveValue("50");
		await expect.element(maxInput).toHaveValue("70");

		changeValue(getSliders()[0], 51);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expectedArgs);

		expect(handleChangeCommit).toHaveBeenCalledTimes(1);
		expect(handleChangeCommit).toHaveBeenCalledWith(expectedArgs);

		// Still the same because it's controlled
		await expect.element(minInput).toHaveValue("50");
		await expect.element(maxInput).toHaveValue("70");
	});

	test("keyboard changes the value", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		await render(
			<Slider
				name="test-name"
				defaultValue={50}
				onChange={handleChange}
				onChangeCommit={handleChangeCommit}
			/>
		);
		const input = page.getByRole("slider");

		getSliders()[0].focus();
		await userEvent.keyboard("{ArrowRight}");

		await expect.element(input).toHaveValue("51");
		expect(handleChange).toHaveBeenLastCalledWith({ value: 51, name: "test-name" });
		// Keyboard changes commit immediately
		expect(handleChangeCommit).toHaveBeenLastCalledWith({ value: 51, name: "test-name" });

		await userEvent.keyboard("{ArrowLeft}");
		await userEvent.keyboard("{ArrowLeft}");

		await expect.element(input).toHaveValue("49");
		expect(handleChange).toHaveBeenLastCalledWith({ value: 49, name: "test-name" });
	});

	test("disabled", async () => {
		await render(
			<>
				<Slider name="slider" defaultValue={30} disabled />
				<Slider name="slider" range defaultMinValue={30} defaultMaxValue={80} disabled />
			</>
		);
		const inputs = page.getByRole("slider");

		await expect.element(inputs.nth(0)).toBeDisabled();
		await expect.element(inputs.nth(1)).toBeDisabled();
		await expect.element(inputs.nth(2)).toBeDisabled();
	});

	test("disabled ignores pointer", async () => {
		const handleChange = vi.fn();
		await render(
			<Slider
				name="slider"
				defaultValue={30}
				disabled
				onChange={handleChange}
				attributes={{ "data-testid": "root" }}
			/>
		);
		const root = page.getByTestId("root").element() as HTMLElement;

		root.dispatchEvent(
			new MouseEvent("mousedown", { bubbles: true, clientX: getClientX(root, 0.75) })
		);
		window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(page.getByRole("slider")).toHaveValue("30");
	});

	test("renderValue", async () => {
		await render(
			<>
				<Slider name="name" defaultValue={50} renderValue={(args) => `$${args.value}`} />
				<Slider name="name" defaultValue={50} renderValue={false} />
			</>
		);

		await expect.element(page.getByText("$50")).toBeInTheDocument();
		await expect.element(page.getByText("50", { exact: true })).not.toBeInTheDocument();
	});

	test("dragging, form onChange", async () => {
		const handleChange = vi.fn();
		const handleChangeCommit = vi.fn();
		const handleFormChange = vi.fn();

		const Component = () => {
			const handleFormEvent = (e: React.FormEvent<HTMLFormElement>) => {
				handleFormChange([...new FormData(e.currentTarget).entries()]);
			};

			return (
				<form onChange={handleFormEvent}>
					<Slider
						name="slider"
						defaultValue={0}
						onChange={handleChange}
						onChangeCommit={handleChangeCommit}
						attributes={{ "data-testid": "root" }}
					/>
				</form>
			);
		};

		await render(<Component />);
		const root = page.getByTestId("root").element() as HTMLElement;
		const input = page.getByRole("slider");

		// Clicking on the bar moves the closest thumb to the cursor
		root.dispatchEvent(
			new MouseEvent("mousedown", { bubbles: true, clientX: getClientX(root, 0.25) })
		);

		await expect.element(input).toHaveValue("25");
		expect(handleChange).toHaveBeenLastCalledWith({ value: 25, name: "slider" });
		expect(handleFormChange).toHaveBeenLastCalledWith([["slider", "25"]]);

		// Wait for the drag handlers to pick up the active thumb
		await expect.poll(() => root.querySelector("[class*='thumb--active']")).not.toBeNull();
		const commitCount = handleChangeCommit.mock.calls.length;

		window.dispatchEvent(
			new MouseEvent("mousemove", { bubbles: true, clientX: getClientX(root, 0.75) })
		);

		await expect.element(input).toHaveValue("75");
		expect(handleChange).toHaveBeenLastCalledWith({ value: 75, name: "slider" });
		expect(handleFormChange).toHaveBeenLastCalledWith([["slider", "75"]]);
		// Dragging doesn't commit until the thumb is released
		expect(handleChangeCommit).toHaveBeenCalledTimes(commitCount);

		window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

		await expect.poll(() => handleChangeCommit.mock.calls.length).toBe(commitCount + 1);
		expect(handleChangeCommit).toHaveBeenLastCalledWith({ value: 75, name: "slider" });
		await expect.element(input).toHaveFocus();
	});

	test("range, dragging moves the closest thumb", async () => {
		const handleFormChange = vi.fn();

		await render(
			<form onChange={(e) => handleFormChange([...new FormData(e.currentTarget).entries()])}>
				<Slider
					range
					minName="slider-min"
					maxName="slider-max"
					defaultMinValue={30}
					defaultMaxValue={50}
					attributes={{ "data-testid": "root" }}
				/>
			</form>
		);
		const root = page.getByTestId("root").element() as HTMLElement;
		const minInput = page.getByRole("slider").nth(0);
		const maxInput = page.getByRole("slider").nth(1);

		root.dispatchEvent(
			new MouseEvent("mousedown", { bubbles: true, clientX: getClientX(root, 0.8) })
		);

		await expect.element(maxInput).toHaveValue("80");
		await expect.element(minInput).toHaveValue("30");
		expect(handleFormChange).toHaveBeenLastCalledWith([
			["slider-min", "30"],
			["slider-max", "80"],
		]);
		window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

		root.dispatchEvent(
			new MouseEvent("mousedown", { bubbles: true, clientX: getClientX(root, 0.1) })
		);

		await expect.element(minInput).toHaveValue("10");
		await expect.element(maxInput).toHaveValue("80");
		expect(handleFormChange).toHaveBeenLastCalledWith([
			["slider-min", "10"],
			["slider-max", "80"],
		]);
		window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
	});

	test("className, attributes", async () => {
		await render(
			<Slider
				name="name"
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
