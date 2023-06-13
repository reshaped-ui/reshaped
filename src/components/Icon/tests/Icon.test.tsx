import React from "react";
import { render } from "@testing-library/react";
import Icon from "components/Icon";
import IconZap from "icons/Zap";

const fixtures = {
	className: "test-className",
	id: "test-id",
};

describe("Utilities/Icon", () => {
	test("renders decorative svg", () => {
		const { container } = render(<Icon svg={IconZap} />);

		const elIcon = container.querySelector("svg");
		expect(elIcon).toBeInTheDocument();
		expect(container.firstChild).toHaveAttribute("aria-hidden");
	});

	test("works with className, attributes", () => {
		const { container } = render(
			<Icon svg={IconZap} className={fixtures.className} attributes={{ id: fixtures.id }} />
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
