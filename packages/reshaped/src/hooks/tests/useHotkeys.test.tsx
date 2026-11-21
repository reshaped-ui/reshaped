import { describe, expect, test, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useHotkeys from "../useHotkeys";

const Component = (props: { hotkeys: Record<string, (() => void) | null> }) => {
	useHotkeys(props.hotkeys);

	return <div />;
};

describe("Hooks/useHotkeys", () => {
	test("single key", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ a: handleHotkey }} />);

		await userEvent.keyboard("a");
		await userEvent.keyboard("b");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("mod key", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ mod: handleHotkey }} />);

		await userEvent.keyboard("{Meta/}");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("mod key on hold", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "Meta + b": handleHotkey }} />);

		await userEvent.keyboard("{Meta>}bb{/Meta}");

		expect(handleHotkey).toHaveBeenCalledTimes(2);
	});

	test("key list", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "a,b": handleHotkey }} />);

		await userEvent.keyboard("a");
		expect(handleHotkey).toHaveBeenCalledTimes(1);

		await userEvent.keyboard("b");
		expect(handleHotkey).toHaveBeenCalledTimes(2);
	});

	test("key combination", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "a+b": handleHotkey }} />);

		await userEvent.keyboard("{a>}b{/a}");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("key combination without formatting", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "A  + b": handleHotkey }} />);

		await userEvent.keyboard("{a>}b{/a}");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("key combination without order", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "b+a": handleHotkey }} />);

		await userEvent.keyboard("{a>}b{/a}");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("key combination, more keys pressed", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ "z + x": handleHotkey }} />);

		// When c is pressed, it doesn't trigger z+x for the second time
		await userEvent.keyboard("{z>}{x>}c{/x}{/z}");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("modified with alt/option", async () => {
		const handleHotkey = vi.fn();
		const handleHotkeyModified = vi.fn();
		await render(
			<Component hotkeys={{ "alt+n": handleHotkeyModified, "alt+shift": handleHotkey }} />
		);

		await userEvent.keyboard("{Alt>}n{/Alt}");
		expect(handleHotkeyModified).toHaveBeenCalledTimes(1);

		await userEvent.keyboard("{Alt>}{Shift}{/Alt}");
		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("ignores IME composition", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ enter: handleHotkey }} />);

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", isComposing: true }));
		window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
		// Safari ends the composition before keydown, so only keyCode 229 marks it
		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", keyCode: 229 }));
		window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
		expect(handleHotkey).not.toHaveBeenCalled();

		await userEvent.keyboard("{Enter}");
		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});

	test("null handler is ignored", async () => {
		const handleHotkey = vi.fn();
		await render(<Component hotkeys={{ a: null, b: handleHotkey }} />);

		await userEvent.keyboard("a");
		await userEvent.keyboard("b");

		expect(handleHotkey).toHaveBeenCalledTimes(1);
	});
});
