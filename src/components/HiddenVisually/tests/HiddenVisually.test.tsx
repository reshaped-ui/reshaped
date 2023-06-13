import React from "react";
import { render, screen } from "@testing-library/react";
import HiddenVisually from "components/HiddenVisually";

const fixtures = {
	content: "Content",
};

describe("Utilities/HiddenVisually", () => {
	test("renders children", () => {
		render(<HiddenVisually>{fixtures.content}</HiddenVisually>);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});
});
