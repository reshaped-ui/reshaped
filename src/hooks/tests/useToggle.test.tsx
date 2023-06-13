import React from "react";
import { render, screen } from "@testing-library/react";
import useToggle from "hooks/useToggle";

const Component = (props: { revert?: boolean }) => {
	const { revert } = props;
	const { active, activate, deactivate } = useToggle();

	React.useEffect(() => {
		activate();
	}, [activate]);

	React.useEffect(() => {
		if (active && revert) deactivate();
	}, [active, revert, deactivate]);

	return <div>{active ? "Active" : "Inactive"}</div>;
};

describe("useToggle", () => {
	/* We test unlock first so the second test starts with the unlocked scroll on body again */
	test("deactivates", () => {
		render(<Component revert />);

		expect(screen.getByText("Inactive")).toBeInTheDocument();
	});

	test("activates", () => {
		render(<Component />);

		expect(screen.getByText("Active")).toBeInTheDocument();
	});
});
