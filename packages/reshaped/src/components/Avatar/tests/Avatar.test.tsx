import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

import Avatar from "@/components/Avatar";
import IconZap from "@/icons/Zap";
import { render } from "@/tests/render";

// Local image keeps the tests independent from the network
const localImage =
	"data:image/svg+xml," +
	encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"/>');

describe("Components/Avatar", () => {
	test("src, alt", async () => {
		await render(<Avatar src={localImage} alt="Amsterdam canal" />);

		await expect.element(page.getByRole("img")).toHaveAccessibleName("Amsterdam canal");
	});

	test("fallback to icon on image error", async () => {
		const handleError = vi.fn();
		const Component = () => {
			const [error, setError] = React.useState(false);

			return (
				<Avatar
					src={error ? undefined : "/foo"}
					icon={IconZap}
					attributes={{ "data-testid": "root" }}
					imageAttributes={{
						onError: () => {
							setError(true);
							handleError();
						},
					}}
				/>
			);
		};

		await render(<Component />);

		await expect.poll(() => handleError).toHaveBeenCalledTimes(1);
		await expect.element(page.getByRole("presentation")).not.toBeInTheDocument();
		expect(page.getByTestId("root").element().querySelector("svg")).not.toBeNull();
	});

	test("renderImage", async () => {
		await render(
			<Avatar
				src={localImage}
				alt="Amsterdam canal"
				// oxlint-disable-next-line jsx_a11y/alt-text
				renderImage={(attributes) => <img {...attributes} id="test-image" />}
			/>
		);
		const img = page.getByRole("img");

		await expect.element(img).toBeInTheDocument();
		await expect.element(img).toHaveAccessibleName("Amsterdam canal");
		await expect.element(img).toHaveAttribute("id", "test-image");
	});

	test("className, attributes, imageAttributes", async () => {
		await render(
			<div data-testid="root">
				<Avatar
					src={localImage}
					className="test-classname"
					attributes={{ id: "test-id" }}
					imageAttributes={{ id: "test-image-id", alt: "test image" }}
				/>
			</div>
		);
		const root = page.getByTestId("root").element().firstElementChild as HTMLElement;
		const img = page.getByRole("img");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");

		await expect.element(img).toHaveAttribute("id", "test-image-id");
		// Uses alt attribute in case prop is not passed
		await expect.element(img).toHaveAccessibleName("test image");
	});

	test("className, attributes without src", async () => {
		await render(
			<Avatar
				initials="RS"
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
		await expect.element(el).toHaveTextContent("RS");
	});
});
