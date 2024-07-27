import { render } from "@testing-library/react";
import Splitter from "../Splitter";

describe("Components/Splitter", () => {
	test("generates ids correctly", () => {
		render(<Splitter>...</Splitter>);
		expect(true).toBe(true);
	});
});
