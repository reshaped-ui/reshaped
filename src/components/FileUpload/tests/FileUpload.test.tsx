import React from "react";
import { render } from "@testing-library/react";
import FileUpload from "components/FileUpload";

const fixtures = {
	name: "test-name",
	className: "test-className",
	id: "test-id",
	inputId: "test-input-id",
};

describe("Components/FileUpload", () => {
	test("renders file input", () => {
		const { container } = render(
			<FileUpload
				name={fixtures.name}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
				inputAttributes={{ id: fixtures.inputId }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(container.querySelector("input")).toHaveAttribute("id", fixtures.inputId);
	});
});
