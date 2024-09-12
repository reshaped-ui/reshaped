import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Image from "components/Image";

const fixtures = {
	src: "/",
	alt: "Alternative text",
	className: "test-className",
	id: "test-id",
	imageId: "test-image-id",
};

describe("Utilities/Image", () => {
	test("renders image", () => {
		render(<Image src={fixtures.src} alt={fixtures.alt} />);

		const elImage = screen.getByAltText(fixtures.alt);
		expect(elImage).toBeInTheDocument();
	});

	test("renders decorative image", () => {
		render(<Image src={fixtures.src} />);

		const elImage = screen.getByRole("presentation");
		expect(elImage).toBeInTheDocument();
	});

	test("handles load and error", () => {
		const handleLoad = jest.fn();
		const handleError = jest.fn();
		render(
			<Image src={fixtures.src} alt={fixtures.alt} onLoad={handleLoad} onError={handleError} />
		);

		const elImage = screen.getByRole("img");
		fireEvent.load(elImage);
		expect(handleLoad).toBeCalledTimes(1);

		fireEvent.error(elImage);
		expect(handleError).toBeCalledTimes(1);
	});

	test("works with className, attributes", () => {
		const { container } = render(
			<Image
				src={fixtures.src}
				className={fixtures.className}
				attributes={{ id: fixtures.id, style: { opacity: 0.5 } }}
				imageAttributes={{ "data-testid": fixtures.imageId }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
		expect(container.firstChild).toHaveAttribute("data-testid", fixtures.imageId);
		expect(container.firstChild).toHaveStyle("opacity: 0.5");
	});
});
