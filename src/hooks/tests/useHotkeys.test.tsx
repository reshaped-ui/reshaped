import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Reshaped from "components/Reshaped";
import useHotkey from "hooks/useHotkeys";

const Component = (props: { hotkeys: Record<string, () => void | null> }) => {
	const { hotkeys } = props;
	useHotkey(hotkeys);

	return <div />;
};

describe("useHotkey", () => {
	test("triggers callback for a single key", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ a: fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("a");
		await userEvent.keyboard("b");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback for a key combination", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "a+b": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{a>}b{/a}");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback for a mod key", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ mod: fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{Meta}");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback for an array of keys", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "a,b": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("a");
		expect(fn).toHaveBeenCalledTimes(1);

		await userEvent.keyboard("b");
		expect(fn).toHaveBeenCalledTimes(2);
	});

	test("triggers callback for a combination with different casing and spaces", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "A  + b": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{a>}b{/a}");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback for a combination pressed in different order", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "b + a": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{a>}b{/a}");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback when more keys are pressed than required for a callback", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "z + x": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{z>}{x>}c{/x}{/z}");
		// When c is pressed, it doesn't trigger a+b for the second time
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("triggers callback with meta key on hold and another key pressed multiple times", async () => {
		const fn = jest.fn();
		render(
			<Reshaped theme="reshaped">
				<Component hotkeys={{ "Meta + b": fn }} />
			</Reshaped>
		);

		await userEvent.keyboard("{Meta>}bb{/Meta}");
		expect(fn).toHaveBeenCalledTimes(2);
	});
});
