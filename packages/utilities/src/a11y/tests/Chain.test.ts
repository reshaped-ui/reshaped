import { expect, test, describe, beforeEach } from "vitest";

import Chain from "../Chain";

describe("a11y/Chain", () => {
	let chain: Chain<string>;

	beforeEach(() => {
		chain = new Chain<string>();
	});

	test("initializes as empty", () => {
		expect(chain.isEmpty()).toBe(true);
		expect(chain.getAll()).toEqual({});
		expect(chain.tailId).toBe(null);
	});

	test("adds items and maintains chain order", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");
		const id3 = chain.add("third");

		expect(chain.isEmpty()).toBe(false);
		expect(chain.get(id1)).toEqual({ previousId: null, data: "first", nextId: id2 });
		expect(chain.get(id2)).toEqual({ previousId: id1, data: "second", nextId: id3 });
		expect(chain.get(id3)).toEqual({ previousId: id2, data: "third" });
		expect(chain.tailId).toBe(id3);
	});

	test("identifies last item correctly", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");

		expect(chain.isLast(id1)).toBe(false);
		expect(chain.isLast(id2)).toBe(true);
	});

	test("removes middle item and reconnects chain", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");
		const id3 = chain.add("third");

		const removed = chain.remove(id2);

		expect(removed).toBe("second");
		expect(chain.get(id1).nextId).toBe(id3);
		expect(chain.get(id3).previousId).toBe(id1);
		expect(chain.get(id2)).toBeUndefined();
	});

	test("removes last item and updates tail", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");

		chain.remove(id2);

		expect(chain.tailId).toBe(id1);
		expect(chain.get(id1).nextId).toBe(null);
	});

	test("removes first item", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");

		chain.remove(id1);

		expect(chain.get(id2).previousId).toBe(null);
		expect(chain.get(id1)).toBeUndefined();
	});

	test("removes all items leaving chain empty", () => {
		const id1 = chain.add("only");
		chain.remove(id1);

		expect(chain.isEmpty()).toBe(true);
		expect(chain.tailId).toBe(null);
	});

	test("handles removing non-existent item", () => {
		chain.add("first");
		const result = chain.remove(999);

		expect(result).toBeUndefined();
	});

	test("removes previous items until condition is met", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");
		const id3 = chain.add("third");
		const id4 = chain.add("fourth");

		const result = chain.removePreviousTill(id4, (item) => item.data === "second");

		// Last deleted id
		expect(result).toBe("second");

		// Keeps only the first item
		expect(chain.get(id1)).toEqual({ previousId: null, nextId: null, data: "first" });
		expect(chain.get(id2)).toBeUndefined();
		expect(chain.get(id3)).toBeUndefined();
		expect(chain.get(id4)).toBeUndefined();
		expect(chain.tailId).toBe(id1);
	});

	test("removePreviousTill stops at first item when condition never met", () => {
		const id1 = chain.add("first");
		const id2 = chain.add("second");

		const result = chain.removePreviousTill(id2, () => false);

		expect(result).toBe("first");
		expect(chain.get(id1)).toBeUndefined();
		expect(chain.get(id2)).toBeUndefined();
		expect(chain.isEmpty()).toBe(true);
	});
});
