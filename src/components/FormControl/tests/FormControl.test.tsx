import React from "react";
import { render, screen } from "@testing-library/react";
import FormControl, { useFormControl } from "components/FormControl";

const Input = () => {
	const { attributes } = useFormControl();

	console.log({ attributes });
	return <input {...attributes} />;
};

const fixtures = {
	label: "Label",
	caption: "Caption",
	asterisk: "*",
	id: "test-id",
};

describe("FormControl", () => {
	test("renders content", () => {
		render(
			<FormControl required>
				<FormControl.Label>{fixtures.label}</FormControl.Label>
				<Input />
				<FormControl.Helper>{fixtures.caption}</FormControl.Helper>
			</FormControl>
		);

		expect(screen.getByText(fixtures.label)).toBeInTheDocument();
		expect(screen.getByText(fixtures.caption)).toBeInTheDocument();
		expect(screen.getByText(fixtures.asterisk)).toBeInTheDocument();

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("aria-describedby");
		expect(input).toHaveAttribute("id");
	});

	test("uses id", () => {
		render(
			<FormControl required id={fixtures.id}>
				<FormControl.Label>{fixtures.label}</FormControl.Label>
				<Input />
				<FormControl.Helper>{fixtures.caption}</FormControl.Helper>
			</FormControl>
		);

		const input = screen.getByRole("textbox");
		const label = screen.getByText(fixtures.label);

		expect(input).toHaveAttribute("id", fixtures.id);
		expect(input).toHaveAttribute("aria-describedby", `${fixtures.id}-caption`);

		expect(label).toHaveAttribute("for", fixtures.id);
		expect(label).toHaveAttribute("id", `${fixtures.id}-label`);
	});

	test("grouped", () => {
		render(
			<FormControl group>
				<FormControl.Label>Favorite animals:</FormControl.Label>
			</FormControl>
		);

		expect(screen.getByRole("group")).toBeInTheDocument();
	});
});
