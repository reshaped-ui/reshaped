import { expect, test, describe, beforeEach, vi } from "vitest";

import rafThrottle from "../rafThrottle";

const waitForNextFrame = (): Promise<void> => {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			resolve();
		});
	});
};

describe("helpers/rafThrottle", () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let mockFn: ReturnType<typeof vi.fn<(...args: any[]) => void>>;

	beforeEach(() => {
		mockFn = vi.fn();
	});

	test("calls the function once per animation frame", async () => {
		const throttled = rafThrottle(mockFn);

		throttled("first");
		throttled("second");
		throttled("third");

		expect(mockFn).not.toHaveBeenCalled();

		await waitForNextFrame();

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("third");
	});

	test("handles multiple arguments correctly", async () => {
		const throttled = rafThrottle(mockFn);

		throttled("arg1", "arg2", 123);
		throttled("new1", "new2", 456);

		await waitForNextFrame();

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("new1", "new2", 456);
	});

	test("allows multiple calls across different frames", async () => {
		const throttled = rafThrottle(mockFn);

		// First frame
		throttled("frame1-1");
		throttled("frame1-2");
		await waitForNextFrame();

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("frame1-2");

		// Second frame
		throttled("frame2-1");
		throttled("frame2-2");
		await waitForNextFrame();

		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenCalledWith("frame2-2");
	});
});
