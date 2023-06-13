import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import Reshaped from "components/Reshaped";
import useRTL from "hooks/useRTL";

const Component = () => {
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		act(() => setRTL(true));
	}, [setRTL]);

	return <div>{rtl}</div>;
};

describe("useRTL", () => {
	test("switches to RTL", () => {
		render(
			<Reshaped theme="reshaped">
				<Component />
			</Reshaped>
		);

		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	});

	test("defaults to RTL", () => {
		render(<Reshaped theme="reshaped" defaultRTL />);

		expect(document.documentElement).toHaveAttribute("dir", "rtl");
	});
});
