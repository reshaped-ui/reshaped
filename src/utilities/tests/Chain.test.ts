import { expect, test, describe } from "vitest";

import Chain from "utilities/Chain";

describe("Chain", () => {
	test("gets an item", () => {
		const chain = new Chain();

		const id = chain.add("Test");
		expect(chain.get(id).data).toBe("Test");
	});

	test("validates last item", () => {
		const chain = new Chain();

		const firstId = chain.add("Test");
		const lastId = chain.add("Test 2");

		expect(chain.isLast(firstId)).toBe(false);
		expect(chain.isLast(lastId)).toBe(true);
	});

	test("adds items", () => {
		const chain = new Chain();

		chain.add("Test");
		expect(chain.getAll()).toMatchSnapshot();
	});

	test("removes item in the middle", () => {
		const chain = new Chain();

		chain.add("Test");
		const id = chain.add("Test 2");
		chain.add("Test 3");
		chain.remove(id);

		expect(chain.getAll()).toMatchSnapshot();
	});

	test("removes side items", () => {
		const chain = new Chain();

		const idFirst = chain.add("Test");
		chain.add("Test 2");
		const idLast = chain.add("Test 3");
		chain.remove(idFirst);
		chain.remove(idLast);

		expect(chain.getAll()).toMatchSnapshot();
	});

	test("removes previous elements till condition is true", () => {
		const chain = new Chain();

		chain.add("Test");
		chain.add("Test 2");
		const id = chain.add("Test 3");
		chain.removePreviousTill(id, (item) => item.data === "Test 2");

		expect(chain.getAll()).toMatchSnapshot();
	});
});
