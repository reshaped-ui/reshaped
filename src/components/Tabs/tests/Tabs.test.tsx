import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "components/Tabs";
import Reshaped from "components/Reshaped";

const fixtures = {
	name: "tabs",
	item1: "Item 1",
	item2: "Item 2",
	value1: "1",
	value2: "2",
	tab1: "Tab 1",
	tab2: "Tab 2",
	className: "test-className",
	id: "test-id",
};

describe("Tabs", () => {
	test("renders correctly", async () => {
		render(
			<Reshaped>
				<Tabs>
					<Tabs.List>
						<Tabs.Item value={fixtures.value1}>{fixtures.item1}</Tabs.Item>
						<Tabs.Item value={fixtures.value2}>{fixtures.item2}</Tabs.Item>
					</Tabs.List>

					<Tabs.Panel value={fixtures.value1}>{fixtures.tab1}</Tabs.Panel>
					<Tabs.Panel value={fixtures.value2}>{fixtures.tab2}</Tabs.Panel>
				</Tabs>
			</Reshaped>
		);

		const list = screen.getByRole("tablist");
		const items = screen.getAllByRole("tab");
		const panels = screen.getAllByRole("tabpanel");

		expect(list).toBeInTheDocument();
		expect(items).toHaveLength(2);
		expect(panels).toHaveLength(2);

		const selectedItem = items[0];
		const selectedPanel = panels[0];
		expect(selectedItem).toHaveAttribute("aria-selected", "true");
		expect(selectedItem.getAttribute("aria-controls")).toBe(selectedPanel.getAttribute("id"));

		const unselectedItem = items[1];
		const unselectedPanel = panels[1];
		expect(unselectedItem).toHaveAttribute("aria-selected", "false");
		expect(unselectedItem.getAttribute("aria-controls")).toBe(unselectedPanel.getAttribute("id"));

		await userEvent.tab();
		expect(document.activeElement).toBe(items[0]);

		await userEvent.tab();
		waitFor(() => {
			expect(document.activeElement).toBe(panels[0]);
		});
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();

		render(
			<Reshaped>
				<Tabs defaultValue={fixtures.value2} onChange={handleChange}>
					<Tabs.List>
						<Tabs.Item value={fixtures.value1}>{fixtures.item1}</Tabs.Item>
						<Tabs.Item value={fixtures.value2}>{fixtures.item2}</Tabs.Item>
					</Tabs.List>

					<Tabs.Panel value={fixtures.value1}>{fixtures.tab1}</Tabs.Panel>
					<Tabs.Panel value={fixtures.value2}>{fixtures.tab2}</Tabs.Panel>
				</Tabs>
			</Reshaped>
		);

		const items = screen.getAllByRole("tab");

		await act(() => {
			return userEvent.click(items[0]);
		});

		expect(document.activeElement).toBe(items[0]);
		expect(items[0]).toHaveAttribute("aria-selected", "true");
		expect(items[0]).toHaveAttribute("tabindex", "0");
		expect(items[1]).toHaveAttribute("tabindex", "-1");

		expect(handleChange).toBeCalledTimes(1);
	});

	// test("works as controlled", async () => {
	// 	const handleChange = jest.fn();

	// 	render(
	// 		<Reshaped>
	// 			<Tabs value={fixtures.value2} onChange={handleChange}>
	// 				<Tabs.List>
	// 					<Tabs.Item value={fixtures.value1}>{fixtures.item1}</Tabs.Item>
	// 					<Tabs.Item value={fixtures.value2}>{fixtures.item2}</Tabs.Item>
	// 				</Tabs.List>

	// 				<Tabs.Panel value={fixtures.value1}>{fixtures.tab1}</Tabs.Panel>
	// 				<Tabs.Panel value={fixtures.value2}>{fixtures.tab2}</Tabs.Panel>
	// 			</Tabs>
	// 		</Reshaped>
	// 	);

	// 	const items = screen.getAllByRole("tab");

	// 	await userEvent.click(items[0]);
	// 	expect(document.activeElement).toBe(items[0]);
	// 	// Keeps previous selection since state is not controlled in the code
	// 	expect(items[0]).toHaveAttribute("aria-selected", "false");
	// 	expect(items[0]).toHaveAttribute("tabindex", "-1");
	// 	expect(items[1]).toHaveAttribute("tabindex", "0");

	// 	expect(handleChange).toBeCalledTimes(1);
	// });

	// test("works as a radio button", async () => {
	// 	render(
	// 		<Reshaped>
	// 			<Tabs defaultValue={fixtures.value2} name={fixtures.name}>
	// 				<Tabs.List>
	// 					<Tabs.Item value={fixtures.value1}>{fixtures.item1}</Tabs.Item>
	// 					<Tabs.Item value={fixtures.value2}>{fixtures.item2}</Tabs.Item>
	// 				</Tabs.List>

	// 				<Tabs.Panel value={fixtures.value1}>{fixtures.tab1}</Tabs.Panel>
	// 				<Tabs.Panel value={fixtures.value2}>{fixtures.tab2}</Tabs.Panel>
	// 			</Tabs>
	// 		</Reshaped>
	// 	);

	// 	const inputs = screen.getAllByRole("radio");
	// 	const firstItem = screen.getByText(fixtures.item1);

	// 	expect(inputs.length).toBe(2);
	// 	expect(inputs[0]).toHaveAttribute("name", fixtures.name);
	// 	expect(inputs[0]).not.toBeChecked();
	// 	expect(inputs[1]).toHaveAttribute("name", fixtures.name);
	// 	expect(inputs[1]).toBeChecked();

	// 	await userEvent.click(firstItem);

	// 	// TODO: Trigger transitionEnd on the decorative selection element
	// 	// fireEvent.transitionEnd(firstItem);

	// 	// // Wait for animation
	// 	// await waitFor(() => {
	// 	// 	expect(inputs[0]).toBeChecked();
	// 	// 	expect(inputs[1]).not.toBeChecked();
	// 	// });
	// });

	test("applies className and attributes", () => {
		const { container } = render(
			<Reshaped>
				<Tabs>
					<Tabs.List className={fixtures.className} attributes={{ id: fixtures.id }}>
						<Tabs.Item value={fixtures.value1}>{fixtures.item1}</Tabs.Item>
						<Tabs.Item value={fixtures.value2}>{fixtures.item2}</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Reshaped>
		);

		expect(container.firstChild?.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild?.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
