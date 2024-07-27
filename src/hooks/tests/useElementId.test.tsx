import { render, queryByAttribute, waitFor } from "@testing-library/react";
import useElementId from "../useElementId";

const Component = (props: { id?: string }) => {
	const id = useElementId(props.id);

	return <div id={id} />;
};

describe("useElementId", () => {
	test("generates ids correctly", () => {
		const { container } = render(
			<>
				<Component />
				<Component id="hey" />
				<Component />
			</>
		);

		waitFor(() => {
			expect(queryByAttribute("id", container, "__reshaped-1")).toBeTruthy();
			expect(queryByAttribute("id", container, "hey")).toBeTruthy();
			expect(queryByAttribute("id", container, "__reshaped-2")).toBeTruthy();
		});
	});
});
