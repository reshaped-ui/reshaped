import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSingletonRTL } from "hooks/_private/useSingletonEnvironment";

const Test = () => {
	const [rtl, setRTL] = useSingletonRTL();

	return (
		<button type="button" onClick={() => setRTL(!rtl)}>
			{rtl ? "RTL" : "LTR"}
		</button>
	);
};

describe("hooks/_private/useSingletonEnvironment", () => {
	it("toggles dir", async () => {
		render(<Test />);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(document.documentElement).toHaveAttribute("dir", "rtl");
		await userEvent.click(button);
		expect(document.documentElement).toHaveAttribute("dir", "ltr");
	});

	it("updates state on attribute manual change", async () => {
		render(<Test />);

		document.documentElement.setAttribute("dir", "rtl");
		await waitFor(() => {
			expect(screen.queryByText("RTL")).toBeInTheDocument();
		});
	});
});
