import React from "react";
import { render, screen } from "@testing-library/react";
import Reshaped from "components/Reshaped";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";

const Component = (props: Parameters<typeof useResponsiveClientValue<string>>[0]) => {
	const value = useResponsiveClientValue(props);

	return <div>{value}</div>;
};

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

describe("useResponsiveClientValue", () => {
	test("returns s value", () => {
		render(
			<Reshaped>
				<Component s="foo" m="bar" />
			</Reshaped>
		);

		expect(screen.queryByText("foo")).toBeInTheDocument();
	});

	test("returns m value when Reshaped has m as defaultViewport", () => {
		render(
			<Reshaped defaultViewport="m">
				<Component s="foo" m="bar" />
			</Reshaped>
		);

		expect(screen.queryByText("bar")).toBeInTheDocument();
	});

	test("works with fallback", () => {
		render(
			<Reshaped defaultViewport="l">
				<Component s="foo" m="bar" />
			</Reshaped>
		);

		expect(screen.queryByText("bar")).toBeInTheDocument();
	});
});
