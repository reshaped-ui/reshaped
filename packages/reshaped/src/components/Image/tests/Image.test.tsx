import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

import Image from "@/components/Image";
import { render } from "@/tests/render";

// Local images keep the tests independent from the network
const localImage =
	"data:image/svg+xml," +
	encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"/>');

const largeImage =
	"data:image/svg+xml," +
	encodeURIComponent(
		'<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="100%" height="100%" fill="teal"/></svg>'
	);

describe("Utility components/Image", () => {
	test("alt", async () => {
		await render(<Image src={localImage} alt="Image alt" />);

		await expect.element(page.getByRole("img")).toHaveAccessibleName("Image alt");
	});

	test("no alt renders a presentation image", async () => {
		await render(<Image src={localImage} />);

		await expect.element(page.getByRole("presentation")).toHaveAttribute("alt", "");
	});

	test("onLoad", async () => {
		const handleLoad = vi.fn();
		await render(<Image src={localImage} alt="photo" onLoad={handleLoad} />);
		const img = page.getByRole("img").element();

		await expect.poll(() => handleLoad).toHaveBeenCalledTimes(1);
		expect(handleLoad).toHaveBeenCalledWith(expect.objectContaining({ target: img, type: "load" }));
	});

	test("onError", async () => {
		const handleError = vi.fn();
		await render(<Image src="/invalid.png" alt="photo" onError={handleError} />);
		const img = page.getByRole("img").element();

		await expect.poll(() => handleError).toHaveBeenCalledTimes(1);
		expect(handleError).toHaveBeenCalledWith(
			expect.objectContaining({ target: img, type: "error" })
		);
	});

	test("outline, image larger than the root", async () => {
		await render(
			<Image
				src={largeImage}
				alt="large photo"
				width="36px"
				height="36px"
				outline
				attributes={{ id: "test-outline-root" }}
			/>
		);
		const img = page.getByAltText("large photo").element() as HTMLImageElement;
		const root = img.parentElement!;

		// Root attributes are applied to the wrapper only
		await expect.element(root).toHaveAttribute("id", "test-outline-root");
		await expect.element(img).not.toHaveAttribute("id");

		await expect.poll(() => img.complete).toBe(true);

		const rootRect = root.getBoundingClientRect();
		const imgRect = img.getBoundingClientRect();

		expect(rootRect.width).toBe(36);
		expect(rootRect.height).toBe(36);
		expect(imgRect.width).toBe(36);
		expect(imgRect.height).toBe(36);
	});

	test("renderImage", async () => {
		await render(
			<Image
				src={localImage}
				alt="Amsterdam canal"
				// oxlint-disable-next-line jsx_a11y/alt-text
				renderImage={(attributes) => <img {...attributes} id="test-image" />}
			/>
		);
		const img = page.getByRole("img");

		await expect.element(img).toHaveAccessibleName("Amsterdam canal");
		await expect.element(img).toHaveAttribute("id", "test-image");
	});

	test("renderImage, fallback", async () => {
		await render(
			<Image
				src="error"
				fallback={localImage}
				alt="Amsterdam canal 2"
				// oxlint-disable-next-line jsx_a11y/alt-text
				renderImage={(attributes) => <img {...attributes} id="test-image-fallback" />}
			/>
		);
		const img = page.getByRole("img");

		await expect.element(img).toHaveAttribute("id", "test-image-fallback");
		await expect.element(img).toHaveAttribute("src", localImage);
		await expect.element(img).toHaveAccessibleName("Amsterdam canal 2");
	});

	test("className, attributes, imageAttributes", async () => {
		await render(
			<div data-testid="root">
				<Image
					src={localImage}
					alt="photo"
					className="test-classname"
					attributes={{ id: "test-id" }}
					imageAttributes={{ "data-testid": "test-img-id" }}
				/>
			</div>
		);
		const img = page.getByRole("img");
		const root = page.getByTestId("root").element().firstElementChild as HTMLElement;

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(img).toHaveAttribute("data-testid", "test-img-id");
	});
});
