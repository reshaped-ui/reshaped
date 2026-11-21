import React from "react";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import { render } from "@/tests/render";
import useRTL from "../useRTL";

const Component = (props: { rtl?: boolean }) => {
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		if (props.rtl !== undefined) setRTL(props.rtl);
	}, [setRTL, props.rtl]);

	return <div>{rtl ? "RTL" : "LTR"}</div>;
};

describe("Hooks/useRTL", () => {
	test("setRTL", async () => {
		await render(<Component rtl />);
		const root = document.documentElement;

		await expect.element(root).toHaveAttribute("dir", "rtl");
		await expect.element(page.getByText("RTL")).toBeInTheDocument();
	});

	test("setRTL false", async () => {
		const { rerender } = await render(<Component rtl />);
		const root = document.documentElement;

		await expect.element(root).toHaveAttribute("dir", "rtl");

		await rerender(<Component rtl={false} />);

		await expect.element(root).toHaveAttribute("dir", "ltr");
		await expect.element(page.getByText("LTR")).toBeInTheDocument();
	});

	test("syncs with the dir attribute changed directly", async () => {
		await render(<Component />);

		await expect.element(page.getByText("LTR")).toBeInTheDocument();

		document.documentElement.setAttribute("dir", "rtl");
		await expect.element(page.getByText("RTL")).toBeInTheDocument();

		document.documentElement.setAttribute("dir", "ltr");
		await expect.element(page.getByText("LTR")).toBeInTheDocument();
	});
});
