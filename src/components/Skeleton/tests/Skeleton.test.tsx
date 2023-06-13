import React from "react";
import { render } from "@testing-library/react";
import Skeleton from "components/Skeleton";

const fixtures = {
	className: "test-className",
	id: "test-id",
};

describe("Components/Skeleton", () => {
	test("applies className and attributes", () => {
		const { container } = render(
			<Skeleton className={fixtures.className} attributes={{ "data-id": fixtures.id }} />
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("data-id", fixtures.id);
	});
});
