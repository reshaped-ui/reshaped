import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import Link from "components/Link";
import Radio from "components/Radio";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import TextArea from "components/TextArea";
import TextField from "components/TextField";
import View from "components/View";
import * as keys from "constants/keys";
import useToggle from "hooks/useToggle";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

import TrapFocus from "../TrapFocus";

export default {
	title: "Utilities/TrapFocus",
};

const TrapContent: React.FC<{
	rootRef: React.RefObject<HTMLDivElement | null>;
	onRelease: () => void;
}> = (props) => {
	return (
		<View
			gap={4}
			direction="row"
			padding={4}
			backgroundColor="neutral-faded"
			borderRadius="medium"
			attributes={{ ref: props.rootRef }}
		>
			<Button onClick={() => {}}>Action 1</Button>
			<Button onClick={() => {}}>Action 2</Button>
			<Button onClick={() => {}}>Action 3</Button>
			<Button onClick={props.onRelease}>Release</Button>
		</View>
	);
};

export const modeDialog: StoryObj = {
	name: "mode: dialog",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, { mode: "dialog" });
			return () => trapFocus.release();
		}, [trapToggle.active]);

		return (
			<Example>
				<Example.Item
					title={["mode: dialog", "tab navigation, always stays inside until released"]}
				>
					<View gap={4}>
						<View.Item>
							<Button onClick={trapToggle.activate}>Trap focus</Button>
						</View.Item>

						{trapToggle.active && (
							<TrapContent onRelease={trapToggle.deactivate} rootRef={rootRef} />
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button");
		const releaseTrigger = canvas.getAllByRole("button")[3];

		// Test screen reader trap
		// All elements outside have aria-hidden so they're ignored
		expect(trapContentActions.includes(trigger)).toBeFalsy();
		expect(trapContentActions[0].parentNode?.previousSibling).toHaveAttribute("aria-hidden");

		expect(releaseTrigger).toBeInTheDocument();
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		// Doesn't use arrow keys
		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{Enter/}");
		expect(document.activeElement).toBe(trigger);
	},
};

export const modeActionMenu: StoryObj = {
	name: "mode: action-menu",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "action-menu",
				onRelease: () => {
					trapToggle.deactivate();
				},
			});

			return () => trapFocus.release();
		}, [trapToggle]);

		return (
			<Example>
				<Example.Item
					title={[
						"mode: action-menu",
						"up/down arrow navigation, tab and shift+tab release the focus and follows natural tab order",
					]}
				>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
							<Button onClick={() => {}}>Next trigger</Button>
						</View>

						{trapToggle.active && (
							<TrapContent onRelease={trapToggle.deactivate} rootRef={rootRef} />
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];
		// const nextTrigger = canvas.getAllByRole("button")[1];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button").slice(2);

		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trigger);

		await userEvent.click(trigger);
		await userEvent.keyboard("{Tab/}");

		console.log(document.activeElement);

		// FIXME: Storybook moves focus to body
		// expect(document.activeElement).toBe(nextTrigger);
	},
};

export const modeActionBar: StoryObj = {
	name: "mode: action-bar",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "action-bar",
				onRelease: () => {
					trapToggle.deactivate();
				},
			});

			return () => trapFocus.release();
		}, [trapToggle]);

		return (
			<Example>
				<Example.Item
					title={[
						"mode: action-bar",
						"left/right arrow navigation, tab and shift+tab release the focus and follows natural tab order",
					]}
				>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
							<Button onClick={() => {}}>Next trigger</Button>
						</View>

						{trapToggle.active && (
							<TrapContent onRelease={trapToggle.deactivate} rootRef={rootRef} />
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];
		// const nextTrigger = canvas.getAllByRole("button")[1];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button").slice(2);

		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowRight/}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trigger);

		await userEvent.click(trigger);
		await userEvent.keyboard("{Tab/}");

		console.log(document.activeElement);

		// FIXME: Storybook moves focus to body
		// expect(document.activeElement).toBe(nextTrigger);
	},
};

export const modeContentMenu: StoryObj = {
	name: "mode: content-menu",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "content-menu",
				onRelease: () => {
					trapToggle.deactivate();
				},
			});

			return () => trapFocus.release();
		}, [trapToggle]);

		return (
			<Example>
				<Example.Item
					title={[
						"mode: content-menu",
						"tab navigation, tabbing outside the content will trigger the release",
					]}
				>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
							<Button onClick={() => {}}>Next trigger</Button>
						</View>

						{trapToggle.active && (
							<TrapContent onRelease={trapToggle.deactivate} rootRef={rootRef} />
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];
		// const nextTrigger = canvas.getAllByRole("button")[1];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button").slice(2);

		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowRight/}");
		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{ArrowLeft/}");
		await userEvent.keyboard("{ArrowUp/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[3]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		await userEvent.keyboard("{Shift>}{Tab/}");
		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trigger);

		// await userEvent.keyboard("{Tab/}");
		// await userEvent.keyboard("{Tab/}");

		// FIXME: Storybook moves focus to body
		// expect(document.activeElement).toBe(nextTrigger);
	},
};

export const includeTrigger: StoryObj = {
	name: "includeTrigger",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "dialog",
				includeTrigger: true,
			});

			return () => trapFocus.release();
		}, [trapToggle.active]);

		return (
			<Example>
				<Example.Item title={["includeTrigger, mode: dialog"]}>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
						</View>

						{trapToggle.active && (
							<TrapContent onRelease={trapToggle.deactivate} rootRef={rootRef} />
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(trigger);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Shift>}{Tab/}");
		expect(document.activeElement).toBe(trigger);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trigger);
	},
};

export const initialFocusEl: StoryObj = {
	name: "initialFocusEl",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const initialFocusRef = React.useRef<HTMLButtonElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "dialog",
				initialFocusEl: initialFocusRef.current,
			});

			return () => trapFocus.release();
		}, [trapToggle.active]);

		return (
			<Example>
				<Example.Item title={["includeTrigger, mode: dialog"]}>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
						</View>

						{trapToggle.active && (
							<View
								gap={4}
								direction="row"
								padding={4}
								backgroundColor="neutral-faded"
								borderRadius="medium"
								attributes={{ ref: rootRef }}
							>
								<Button onClick={() => {}}>Action 1</Button>
								<Button onClick={() => {}} attributes={{ ref: initialFocusRef }}>
									Action 2
								</Button>
								<Button onClick={() => {}}>Action 3</Button>
								<Button onClick={trapToggle.deactivate}>Release</Button>
							</View>
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(trapContentActions[1]);
	},
};

/**
 * Testing edge cases
 */

const Editor = () => {
	const pressedCountRef = React.useRef(0);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== keys.TAB) return;

		pressedCountRef.current += 1;
		if (pressedCountRef.current % 2) e.preventDefault();
	};

	return (
		<View
			backgroundColor="neutral-faded"
			borderColor="neutral-faded"
			borderRadius="medium"
			padding={4}
			attributes={{
				contentEditable: true,
				onKeyDown: handleKeyDown,
				"data-testid": "test-contenteditable",
			}}
		/>
	);
};

export const focusableElements: StoryObj = {
	name: "test: focusable elements",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current);
			return () => trapFocus.release();
		}, [trapToggle.active]);

		return (
			<Example>
				<Example.Item title="test with all types of focusable elements">
					<View gap={4}>
						<View.Item>
							<Button onClick={trapToggle.activate}>Activate</Button>
						</View.Item>

						{trapToggle.active && (
							<View
								backgroundColor="neutral-faded"
								borderRadius="medium"
								padding={4}
								gap={4}
								attributes={{ ref: rootRef }}
								align="start"
							>
								<Link href="#" attributes={{ "data-testid": "test-link" }}>
									Link
								</Link>

								<TextField
									name="input"
									placeholder="Input"
									inputAttributes={{ "data-testid": "test-text-field" }}
								/>

								<TextArea name="textarea" inputAttributes={{ "data-testid": "test-text-area" }} />

								<Select
									name="select"
									options={[
										{ label: "Option 1", value: "1" },
										{ label: "Option 2", value: "2" },
									]}
									inputAttributes={{ "data-testid": "test-select" }}
								/>

								<RadioGroup name="radio">
									<Radio value="1" inputAttributes={{ "data-testid": "test-radio-1" }}>
										Option 1
									</Radio>
									<Radio value="2" inputAttributes={{ "data-testid": "test-radio-2" }}>
										Option 2
									</Radio>
								</RadioGroup>

								<Editor />

								<div tabIndex={0} role="button" data-testid="test-tabindex">
									div with tabIndex
								</div>

								<div style={{ display: "none" }}>
									<Button onClick={() => {}} attributes={{ "data-testid": "test-hidden-button" }}>
										Hidden
									</Button>
								</div>

								<Button
									onClick={() => {}}
									attributes={{ tabIndex: -1, "data-testid": "test-button-negative-tabindex" }}
								>
									Excluded
								</Button>

								<input type="hidden" data-testid="test-input-hidden" />

								<Button
									onClick={trapToggle.deactivate}
									attributes={{ "data-testid": "test-button" }}
								>
									Release button
								</Button>
							</View>
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		const link = canvas.getByTestId("test-link");
		const textField = canvas.getByTestId("test-text-field");
		const textArea = canvas.getByTestId("test-text-area");
		const select = canvas.getByTestId("test-select");
		const radio1 = canvas.getByTestId("test-radio-1");
		const radio2 = canvas.getByTestId("test-radio-2");
		const contentEditable = canvas.getByTestId("test-contenteditable");
		const tabIndex = canvas.getByTestId("test-tabindex");
		const negativeTabIndex = canvas.getByTestId("test-button-negative-tabindex");
		const hiddenButton = canvas.getByTestId("test-hidden-button");
		const button = canvas.getByTestId("test-button");

		expect(document.activeElement).toBe(link);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(textField);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(textArea);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(select);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(radio1);

		await userEvent.keyboard("{ArrowDown/}");
		expect(document.activeElement).toBe(radio2);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(contentEditable);

		// Stays for the first tab press
		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(contentEditable);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(tabIndex);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).not.toBe(negativeTabIndex);
		expect(document.activeElement).not.toBe(hiddenButton);
		expect(document.activeElement).toBe(button);
	},
};

export const nested: StoryObj = {
	name: "test: nested",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const innerRootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();
		const innerTrapToggle = useToggle();

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "dialog",
			});

			return () => trapFocus.release();
		}, [trapToggle.active]);

		React.useEffect(() => {
			if (!innerTrapToggle.active) return;
			if (!innerRootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(innerRootRef.current, {
				mode: "dialog",
			});

			return () => trapFocus.release();
		}, [innerTrapToggle.active]);

		return (
			<Example>
				<Example.Item title={["nested, mode: dialog"]}>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
						</View>

						{trapToggle.active && (
							<View gap={4}>
								<View
									gap={4}
									direction="row"
									padding={4}
									backgroundColor="neutral-faded"
									borderRadius="medium"
									attributes={{ ref: rootRef }}
								>
									<Button onClick={() => {}}>Action</Button>
									<Button onClick={innerTrapToggle.activate}>Inner trap focus</Button>
									<Button onClick={trapToggle.deactivate}>Release</Button>
								</View>

								{innerTrapToggle.active && (
									<View
										gap={4}
										direction="row"
										padding={4}
										backgroundColor="neutral-faded"
										borderRadius="medium"
										attributes={{ ref: innerRootRef }}
									>
										<Button onClick={() => {}}>Action</Button>
										<Button onClick={innerTrapToggle.deactivate}>Release</Button>
									</View>
								)}
							</View>
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		const trapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(trapContentActions[0]);

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.click(trapContentActions[1]);

		const innerTrapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(innerTrapContentActions[0]);

		await userEvent.keyboard("{Tab/}");
		await userEvent.click(innerTrapContentActions[1]);

		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{Tab/}");
		await userEvent.click(trapContentActions[2]);

		expect(document.activeElement).toBe(trigger);
	},
};

export const mutationObserver: StoryObj = {
	name: "test: mutation observer",
	render: () => {
		const rootRef = React.useRef<HTMLDivElement>(null);
		const trapToggle = useToggle();
		const [mutated, setMutated] = React.useState(false);

		React.useEffect(() => {
			if (!trapToggle.active) return;
			if (!rootRef.current) return;

			const trapFocus = new TrapFocus();

			trapFocus.trap(rootRef.current, {
				mode: "dialog",
			});

			setTimeout(() => {
				setMutated(true);
			}, 50);

			return () => trapFocus.release();
		}, [trapToggle.active]);

		return (
			<Example>
				<Example.Item title={["includeTrigger, mode: dialog"]}>
					<View gap={4}>
						<View gap={4} direction="row">
							<Button onClick={trapToggle.activate}>Trap focus</Button>
						</View>

						{trapToggle.active && (
							<View
								gap={4}
								direction="row"
								padding={4}
								backgroundColor="neutral-faded"
								borderRadius="medium"
								attributes={{ ref: rootRef }}
							>
								{!mutated && (
									<>
										<Button onClick={() => {}}>Action 1</Button>
										<Button onClick={() => {}}>Action 2</Button>
									</>
								)}
								<Button onClick={() => {}}>Action 3</Button>
								<Button onClick={trapToggle.deactivate}>Release</Button>
							</View>
						)}
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		let trapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(trapContentActions[0]);

		await sleep(100);

		trapContentActions = canvas.getAllByRole("button");

		expect(document.activeElement).toBe(trapContentActions[0]);

		// Check that trap still works after mutation
		await userEvent.keyboard("{Tab}");
		expect(document.activeElement).toBe(trapContentActions[1]);

		await userEvent.keyboard("{Tab}");
		expect(document.activeElement).toBe(trapContentActions[0]);

		// Check that it still knows about the original trigger
		await userEvent.click(trapContentActions[1]);
		expect(document.activeElement).toBe(trigger);
	},
};
