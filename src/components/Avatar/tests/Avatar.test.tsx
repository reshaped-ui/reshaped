import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "components/Avatar";

const fixtures = {
	src: "https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png",
	alt: "Reshaped",
	initials: "RS",
	className: "test-className",
	id: "test-id",
};

describe("Components/Avatar", () => {
	test("renders image", () => {
		render(<Avatar src={fixtures.src} alt={fixtures.alt} initials={fixtures.initials} />);

		const imageEl = screen.getByRole("img");
		const textEl = screen.queryByText(fixtures.initials);

		expect(imageEl).toBeInTheDocument();
		expect(imageEl).toHaveAttribute("alt", fixtures.alt);
		expect(textEl).not.toBeInTheDocument();
	});

	test("renders text", () => {
		render(<Avatar initials={fixtures.initials} />);

		const textEl = screen.getByText(fixtures.initials);

		expect(textEl).toBeInTheDocument();
	});

	test("applies className and attributes", () => {
		const { container } = render(
			<Avatar
				initials={fixtures.initials}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
