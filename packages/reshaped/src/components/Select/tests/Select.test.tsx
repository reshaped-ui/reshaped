import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Actionable from "@/components/Actionable";
import FormControl from "@/components/FormControl";
import Select, { SelectTrigger } from "@/components/Select";
import { render } from "@/tests/render";

const getHiddenInputs = (container: HTMLElement) =>
	Array.from(container.querySelectorAll<HTMLInputElement>('input[type="hidden"]')).map((el) =>
		page.elementLocator(el)
	);

describe("Components/Select", () => {
	describe("default", () => {
		test("name, id, options", async () => {
			const { container } = await render(
				<Select
					name="animal"
					id="animal-1"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveAttribute("name", "animal");
			await expect.element(hiddenInput).toHaveAttribute("id", "animal-1");
			await expect.element(trigger).toHaveTextContent("Select an animal");
			await expect.element(trigger).toHaveAttribute("aria-haspopup", "listbox");
			await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

			await userEvent.click(trigger);

			const listbox = page.getByRole("listbox");
			const options = listbox.getByRole("option");

			await expect.element(listbox).toBeVisible();
			await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
			await expect.element(listbox).not.toHaveAttribute("aria-multiselectable");
			expect(options.all()).toHaveLength(2);
			await expect.element(options.nth(0)).toHaveTextContent("Dog");
			await expect.element(options.nth(1)).toHaveTextContent("Turtle");
		});

		test("option groups", async () => {
			const { container } = await render(
				<Select
					name="animal-2"
					id="animal-2"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Group label="Birds">
						<Select.Option value="pigeon">Pigeon</Select.Option>
						<Select.Option value="parrot">Parrot</Select.Option>
					</Select.Group>
					<Select.Group label="Sea Mammals">
						<Select.Option value="whale">Whale</Select.Option>
						<Select.Option value="dolphin">Dolphin</Select.Option>
					</Select.Group>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveAttribute("name", "animal-2");
			await expect.element(hiddenInput).toHaveAttribute("id", "animal-2");
			await expect.element(trigger).toHaveTextContent("Select an animal");

			await userEvent.click(trigger);

			const groups = page.getByRole("group");
			const options = page.getByRole("option");

			await expect.element(page.getByRole("listbox")).toBeVisible();
			expect(groups.all()).toHaveLength(2);
			await expect.element(groups.nth(0)).toHaveTextContent("Birds");
			await expect.element(groups.nth(1)).toHaveTextContent("Sea Mammals");

			expect(options.all()).toHaveLength(4);
			await expect.element(options.nth(0)).toHaveTextContent("Pigeon");
			await expect.element(options.nth(1)).toHaveTextContent("Parrot");
			await expect.element(options.nth(2)).toHaveTextContent("Whale");
			await expect.element(options.nth(3)).toHaveTextContent("Dolphin");
		});

		test("defaultValue, uncontrolled, onChange", async () => {
			const handleChange = vi.fn();
			const { container } = await render(
				<Select
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onChange={handleChange}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveValue("dog");
			await expect.element(trigger).toHaveTextContent("Dog");

			await userEvent.click(trigger);
			await expect
				.element(page.getByRole("option", { name: "Dog" }))
				.toHaveAttribute("aria-selected", "true");
			await userEvent.click(page.getByRole("option", { name: "Turtle" }));

			await expect.element(hiddenInput).toHaveValue("turtle");
			await expect.element(trigger).toHaveTextContent("Turtle");
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({ name: "animal", value: "turtle" });

			// Single select closes after selecting an option
			await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
			await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
		});

		test("value, controlled, onChange", async () => {
			const handleChange = vi.fn();
			const { container } = await render(
				<Select
					name="animal-2"
					placeholder="Select an animal"
					value="dog"
					onChange={handleChange}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveValue("dog");

			await userEvent.click(trigger);
			await userEvent.click(page.getByRole("option", { name: "Turtle" }));

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({ name: "animal-2", value: "turtle" });
			await expect.element(hiddenInput).toHaveValue("dog");
			await expect.element(trigger).toHaveTextContent("Dog");
		});

		test("onClick", async () => {
			const handleClick = vi.fn();
			await render(
				<Select
					name="animal-3"
					placeholder="Select an animal"
					defaultValue="dog"
					onClick={handleClick}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");

			await userEvent.click(trigger);

			expect(handleClick).toHaveBeenCalledTimes(1);
			expect(trigger.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
			await expect.element(page.getByRole("listbox")).toBeVisible();
		});

		test("multiple", async () => {
			const handleChange = vi.fn();
			const { container } = await render(
				<Select
					multiple
					name="animal"
					placeholder="Select an animal"
					defaultValue={["dog"]}
					onChange={handleChange}
					renderValue={(args) => args.value.join(", ")}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveValue('["dog"]');

			await userEvent.click(trigger);
			await userEvent.click(page.getByRole("option", { name: "Turtle" }));

			// Content stays open to select multiple options
			await expect
				.element(page.getByRole("listbox"))
				.toHaveAttribute("aria-multiselectable", "true");
			await expect.element(hiddenInput).toHaveValue('["dog","turtle"]');
			await expect.element(trigger).toHaveTextContent("dog, turtle");
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({ name: "animal", value: ["dog", "turtle"] });

			// Selecting a selected option removes it
			await userEvent.click(page.getByRole("option", { name: "Dog" }));

			await expect.element(hiddenInput).toHaveValue('["turtle"]');
			expect(handleChange).toHaveBeenLastCalledWith({ name: "animal", value: ["turtle"] });
		});

		test("renderTrigger", async () => {
			const handleChange = vi.fn();
			const { container } = await render(
				<Select
					name="animal"
					position="bottom-start"
					width="200px"
					size="small"
					placeholder="Select an animal"
					onChange={handleChange}
					renderTrigger={(attributes) => (
						<Actionable attributes={attributes}>{attributes.children}</Actionable>
					)}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(hiddenInput).toHaveAttribute("name", "animal");
			await expect.element(hiddenInput).toHaveValue("");
			await expect.element(trigger).toHaveTextContent("Select an animal");
			await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

			await userEvent.click(trigger);

			await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

			await userEvent.click(page.getByRole("option", { name: "Turtle" }));

			await expect.element(hiddenInput).toHaveValue("turtle");
			await expect.element(trigger).toHaveTextContent("Turtle");
			// Trigger stays expanded until the hide animation ends
			await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({ name: "animal", value: "turtle" });
		});

		test("disabled", async () => {
			const handleClick = vi.fn();
			await render(
				<Select
					name="animal"
					placeholder="Select an animal"
					disabled
					onClick={handleClick}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const trigger = page.getByRole("button");

			await expect.element(trigger).toBeDisabled();
			await userEvent.click(trigger, { force: true });

			expect(handleClick).not.toHaveBeenCalled();
			await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
		});

		test("className, attributes, inputAttributes", async () => {
			const { container } = await render(
				<Select
					name="animal"
					placeholder="Select an animal"
					className="custom-class"
					attributes={{ id: "test-id", "data-testid": "root" }}
					inputAttributes={{ "aria-label": "test-label" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);
			const root = page.getByTestId("root");
			const [hiddenInput] = getHiddenInputs(container);

			await expect.element(root).toHaveClass("custom-class");
			await expect.element(root).toHaveAttribute("id", "test-id");
			await expect.element(hiddenInput).toHaveAttribute("aria-label", "test-label");
		});

		test("FormControl", async () => {
			await render(
				<FormControl hasError>
					<FormControl.Label>Animal</FormControl.Label>
					<Select name="animal" placeholder="Select an animal">
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			);
			const trigger = page.getByRole("button", { name: /Animal/ });

			await expect.element(trigger).toHaveAccessibleName("Animal Select an animal");
			await expect.element(trigger).toHaveAccessibleDescription("This field is required");
		});

		test("type-ahead focuses the matching option", async () => {
			await render(
				<Select name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			);

			await userEvent.click(page.getByRole("button"));
			await expect.element(page.getByRole("listbox")).toBeVisible();
			await userEvent.keyboard("t");

			await expect.element(page.getByRole("option", { name: "Turtle" })).toHaveFocus();
		});
	});

	describe("native", () => {
		test("options, name, id", async () => {
			await render(
				<Select
					name="animal"
					id="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			);
			const select = page.getByRole("combobox");
			const options = select.getByRole("option");

			await expect.element(select).toHaveAttribute("name", "animal");
			await expect.element(select).toHaveAttribute("id", "animal");
			expect(options.all()).toHaveLength(3);
			await expect.element(options.nth(0)).toHaveTextContent("Select an animal");
			await expect.element(options.nth(1)).toHaveTextContent("Dog");
			await expect.element(options.nth(2)).toHaveTextContent("Turtle");
		});

		test("optgroup", async () => {
			await render(
				<Select
					name="animal"
					id="animal-optgroup"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<optgroup label="Mammals">
						<option value="dog">Dog</option>
						<option value="cat">Cat</option>
					</optgroup>
					<optgroup label="Reptiles">
						<option value="turtle">Turtle</option>
						<option value="lizard">Lizard</option>
					</optgroup>
				</Select>
			);
			const select = page.getByRole("combobox");
			const options = select.getByRole("option");

			await expect.element(select).toHaveAttribute("name", "animal");
			await expect.element(select).toHaveAttribute("id", "animal-optgroup");

			// Playwright treats the optgroups of a closed native select as hidden
			expect(select.getByRole("group", { includeHidden: true }).all()).toHaveLength(2);

			// 1 placeholder + 4 options
			expect(options.all()).toHaveLength(5);
			await expect.element(options.nth(0)).toHaveTextContent("Select an animal");
			await expect.element(options.nth(1)).toHaveTextContent("Dog");
			await expect.element(options.nth(2)).toHaveTextContent("Cat");
			await expect.element(options.nth(3)).toHaveTextContent("Turtle");
			await expect.element(options.nth(4)).toHaveTextContent("Lizard");
		});

		test("uncontrolled, onChange", async () => {
			const handleChange = vi.fn();
			await render(
				<Select
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onChange={handleChange}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			);
			const select = page.getByRole("combobox");

			await expect.element(select).toHaveValue("dog");

			await userEvent.selectOptions(select, "turtle");

			await expect.element(select).toHaveValue("turtle");
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({
				name: "animal",
				value: "turtle",
				event: expect.objectContaining({ target: select.element() }),
			});
		});

		test("controlled, onChange", async () => {
			const handleChange = vi.fn();
			await render(
				<Select
					name="animal-2"
					placeholder="Select an animal"
					value="dog"
					onChange={handleChange}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			);
			const select = page.getByRole("combobox");

			await expect.element(select).toHaveValue("dog");

			await userEvent.selectOptions(select, "turtle");

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({
				name: "animal-2",
				value: "turtle",
				event: expect.objectContaining({ target: select.element() }),
			});
			await expect.element(select).toHaveValue("dog");
		});

		test("onClick", async () => {
			const handleClick = vi.fn();
			await render(
				<Select
					name="animal-3"
					placeholder="Select an animal"
					defaultValue="dog"
					onClick={handleClick}
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			);
			const select = page.getByRole("combobox");

			await userEvent.click(select);

			expect(handleClick).toHaveBeenCalledTimes(1);
			expect(handleClick).toHaveBeenCalledWith(
				expect.objectContaining({ target: select.element() })
			);
		});
	});

	test("trigger only, onClick", async () => {
		const handleClick = vi.fn();
		const { container } = await render(
			<SelectTrigger
				name="animal"
				placeholder="Select an animal"
				onClick={handleClick}
				value="dog"
				inputAttributes={{ "aria-label": "Select an animal" }}
			>
				Dog
			</SelectTrigger>
		);
		const trigger = page.getByRole("button");
		const [hiddenInput] = getHiddenInputs(container);

		await expect.element(trigger).toHaveTextContent("Dog");
		await expect.element(hiddenInput).toHaveAttribute("name", "animal");
		await expect.element(hiddenInput).toHaveValue("dog");

		await userEvent.click(trigger);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(trigger.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});
});
