import { render, screen } from "@testing-library/react";
import Resizable from "../Resizable";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Panel",
};

describe("Utilities/Resizable", () => {
	test("renders content", () => {
		render(
			<Reshaped>
				<Resizable>
					<Resizable.Item minSize="100px" defaultSize="200px">
						{fixtures.content}
					</Resizable.Item>
					<Resizable.Handle />
					<Resizable.Item>{fixtures.content}</Resizable.Item>
				</Resizable>
			</Reshaped>
		);

		const panels = screen.getAllByText(fixtures.content);
		const trigger = screen.getByRole("button");

		expect(panels).toHaveLength(2);
		expect(trigger).toBeInTheDocument();
	});
});
