import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import FileUpload from "@/components/FileUpload";
import { render } from "@/tests/render";

describe("Components/FileUpload", () => {
	test("name, onChange", async () => {
		const handleChange = vi.fn();
		const file = new File(["hello"], "hello.png", { type: "image/png" });
		await render(
			<FileUpload name="test-name" onChange={handleChange}>
				Content
			</FileUpload>
		);
		const input = page.getByLabelText("Content");
		const inputEl = input.element() as HTMLInputElement;

		await expect.element(input).toHaveAttribute("name", "test-name");
		await expect.element(input).toHaveAttribute("type", "file");
		await userEvent.upload(input, file);

		expect(inputEl.files).toHaveLength(1);
		expect(inputEl.files?.[0]).toMatchObject({ name: "hello.png", type: "image/png" });

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: [expect.objectContaining({ name: "hello.png", type: "image/png" })],
			event: expect.objectContaining({ target: inputEl }),
		});
	});

	test("onChange on drop", async () => {
		const handleChange = vi.fn();
		const file = new File(["hello"], "hello.png", { type: "image/png" });
		await render(
			<FileUpload name="test-name" onChange={handleChange} attributes={{ "data-testid": "root" }}>
				Content
			</FileUpload>
		);
		const root = page.getByTestId("root").element();
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);

		root.dispatchEvent(new DragEvent("dragenter", { bubbles: true, dataTransfer }));
		root.dispatchEvent(
			new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer })
		);
		root.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer }));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: "test-name", value: [file] })
		);
	});

	test("render props receive highlighted while dragging", async () => {
		await render(
			<FileUpload name="test-name" attributes={{ "data-testid": "root" }}>
				{(props) => (props.highlighted ? "Highlighted" : "Content")}
			</FileUpload>
		);
		const root = page.getByTestId("root").element();

		await expect.element(page.getByText("Content")).toBeInTheDocument();
		root.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
		await expect.element(page.getByText("Highlighted")).toBeInTheDocument();
		root.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true }));
		await expect.element(page.getByText("Content")).toBeInTheDocument();
	});

	test("disabled", async () => {
		await render(
			<FileUpload name="test-name" disabled>
				Content
			</FileUpload>
		);

		await expect.element(page.getByLabelText("Content")).toBeDisabled();
	});

	test("className, attributes", async () => {
		await render(
			<FileUpload
				name="name"
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				inputAttributes={{ id: "test-input-id" }}
			>
				Content
			</FileUpload>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
		await expect.element(page.getByLabelText("Content")).toHaveAttribute("id", "test-input-id");
	});
});
