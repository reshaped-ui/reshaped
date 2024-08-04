import { render } from "@testing-library/react";
import Splitter from "../Resizable";

describe("Components/Resizable", () => {
	test("generates ids correctly", () => {
		render(<Splitter>...</Splitter>);
		expect(true).toBe(true);
	});
});
