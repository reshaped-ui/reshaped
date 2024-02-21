import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Overlay from "components/Overlay";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	testId: "test-id",
};

describe("Utilities/Overlay", () => {
	test("renders children", () => {
		render(
			<Reshaped>
				<Overlay active>{fixtures.content}</Overlay>
			</Reshaped>
		);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("renders children as a function", () => {
		render(
			<Reshaped>
				<Overlay active>{({ active }) => (active ? fixtures.content : "")}</Overlay>
			</Reshaped>
		);

		const el = screen.getByText(fixtures.content);
		expect(el).toBeInTheDocument();
	});

	test("triggers onOpen and onClose", async () => {
		const handleCloseMock = jest.fn();
		const Component = () => {
			const [active, setActive] = React.useState(true);

			const handleClose = () => {
				setActive(false);
				handleCloseMock();
			};

			const handleOpen = () => {
				setActive(true);
			};

			return (
				<Reshaped>
					<button type="button" data-testid={fixtures.testId} onClick={handleOpen}>
						Open
					</button>
					<Overlay active={active} onClose={handleClose}>
						{fixtures.content}
					</Overlay>
				</Reshaped>
			);
		};

		render(<Component />);

		const elButton = screen.getByTestId(fixtures.testId);

		await userEvent.click(screen.getByText(fixtures.content));

		expect(handleCloseMock).toBeCalledTimes(1);
		waitFor(() => {
			expect(screen.getByText(fixtures.content)).not.toBeInTheDocument();
		});

		await userEvent.click(elButton);
		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});
});
