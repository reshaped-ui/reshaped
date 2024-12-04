import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import View from "components/View";
import ContextMenu from "components/ContextMenu";
import Reshaped from "components/Reshaped";

const fixtures = {
	id: "test-id",
	content: "test content",
};

describe("Components/ContextMenu", () => {
	test("opens on right click", async () => {
		render(
			<Reshaped>
				<ContextMenu>
					<View
						width={50}
						height={50}
						backgroundColor="neutral-faded"
						borderRadius="medium"
						attributes={{ "data-testid": fixtures.id }}
					/>
					<ContextMenu.Content>{fixtures.content}</ContextMenu.Content>
				</ContextMenu>
			</Reshaped>
		);

		const rootEl = screen.getByTestId(fixtures.id);

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();

		await userEvent.pointer({ target: rootEl, keys: "[MouseRight]" });

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});
});
