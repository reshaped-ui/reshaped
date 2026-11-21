import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import HiddenVisually from "@/components/HiddenVisually";
import { render } from "@/tests/render";

describe("Utility components/HiddenVisually", () => {
	test("children", async () => {
		await render(<HiddenVisually>Content</HiddenVisually>);

		await expect.element(page.getByText("Content")).toBeInTheDocument();
	});
});
