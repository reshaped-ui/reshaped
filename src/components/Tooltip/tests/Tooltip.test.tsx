import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	openText: "Text",
};

describe("Components/Tooltip", () => {
	test("doesn't render children", () => {
		const { unmount } = render(
			<Reshaped>
				<Tooltip text={fixtures.content}>
					{(attributes) => <Button attributes={attributes}>{fixtures.openText}</Button>}
				</Tooltip>
			</Reshaped>
		);

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		unmount();
	});

	test("works as uncontrolled", async () => {
		const handleOpen = jest.fn();
		const handleClose = jest.fn();

		render(
			<Reshaped>
				<Tooltip text={fixtures.content} onOpen={handleOpen} onClose={handleClose}>
					{(attributes) => <Button attributes={attributes}>{fixtures.openText}</Button>}
				</Tooltip>
			</Reshaped>
		);

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("aria-describedby");
		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await userEvent.hover(button);

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).toBeInTheDocument();
			expect(handleOpen).toBeCalledTimes(1);
		});

		await userEvent.unhover(button);

		waitFor(() => {
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
			expect(handleClose).toBeCalledTimes(1);
		});
	});
});
