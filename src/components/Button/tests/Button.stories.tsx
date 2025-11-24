import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Avatar from "components/Avatar";
import Button from "components/Button";
import Hotkey from "components/Hotkey";
import Image from "components/Image";
import View from "components/View";
import IconZap from "icons/Zap";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Button",
	component: Button,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/button",
		},
	},
};

const imgUrl =
	"https://images.unsplash.com/photo-1632502361954-0dd92ce797db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1625&q=80";

export const variantAndColor = {
	name: "variant, color",
	render: () => (
		<Example>
			<Example.Item title="variant: solid">
				<View gap={4} direction="row">
					<Button onClick={() => {}}>Button</Button>
					<Button onClick={() => {}} color="primary">
						Button
					</Button>
					<Button onClick={() => {}} color="critical">
						Button
					</Button>
					<Button onClick={() => {}} color="positive">
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="variant: faded">
				<View direction="row" gap={4}>
					<Button onClick={() => {}} variant="faded">
						Button
					</Button>
					<Button onClick={() => {}} color="primary" variant="faded">
						Button
					</Button>
					<Button onClick={() => {}} color="critical" variant="faded">
						Button
					</Button>
					<Button onClick={() => {}} color="positive" variant="faded">
						Button
					</Button>
					<View padding={4} borderRadius="medium" attributes={{ style: { color: "#029CFD" } }}>
						<Button onClick={() => {}} color="inherit" variant="faded">
							Inherit
						</Button>
					</View>

					<View padding={4} backgroundColor="black" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="faded">
							Inherit
						</Button>
					</View>
					<View padding={4} backgroundColor="white" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="faded">
							Inherit
						</Button>
					</View>
				</View>
			</Example.Item>
			<Example.Item title="variant: outline">
				<View direction="row" gap={4}>
					<Button onClick={() => {}} variant="outline">
						Button
					</Button>
					<Button onClick={() => {}} color="primary" variant="outline">
						Button
					</Button>
					<Button onClick={() => {}} color="critical" variant="outline">
						Button
					</Button>
					<Button onClick={() => {}} color="positive" variant="outline">
						Button
					</Button>

					<View padding={4} borderRadius="medium" attributes={{ style: { color: "#029CFD" } }}>
						<Button onClick={() => {}} color="inherit" variant="outline">
							Inherit
						</Button>
					</View>

					<View padding={4} backgroundColor="black" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="outline">
							Inherit
						</Button>
					</View>
					<View padding={4} backgroundColor="white" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="outline">
							Inherit
						</Button>
					</View>
				</View>
			</Example.Item>
			<Example.Item title="variant: ghost">
				<View direction="row" gap={4}>
					<Button onClick={() => {}} variant="ghost">
						Button
					</Button>
					<Button onClick={() => {}} color="primary" variant="ghost">
						Button
					</Button>
					<Button onClick={() => {}} color="critical" variant="ghost">
						Button
					</Button>
					<Button onClick={() => {}} color="positive" variant="ghost">
						Button
					</Button>
					<View padding={4} borderRadius="medium" attributes={{ style: { color: "#029CFD" } }}>
						<Button onClick={() => {}} color="inherit" variant="ghost">
							Inherit
						</Button>
					</View>

					<View padding={4} backgroundColor="black" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="ghost">
							Inherit
						</Button>
					</View>
					<View padding={4} backgroundColor="white" borderRadius="medium">
						<Button onClick={() => {}} color="inherit" variant="ghost">
							Inherit
						</Button>
					</View>
				</View>
			</Example.Item>
			<Example.Item title="color: media">
				<View backgroundColor="primary" borderRadius="medium" padding={4} direction="row" gap={4}>
					<Button onClick={() => {}} color="media">
						Button
					</Button>

					<Button onClick={() => {}} color="media" variant="faded">
						Button
					</Button>
				</View>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "icon",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<Button onClick={() => {}} icon={IconZap}>
					Button
				</Button>
			</Example.Item>

			<Example.Item title="endIcon">
				<Button onClick={() => {}} endIcon={IconZap}>
					Button
				</Button>
			</Example.Item>

			<Example.Item title="icon, endIcon">
				<Button onClick={() => {}} icon={IconZap} endIcon={IconZap}>
					Button
				</Button>
			</Example.Item>

			<Example.Item title="icon only">
				<Button onClick={() => {}} icon={IconZap} attributes={{ "aria-label": "Action" }} />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={4} direction="row">
					<Button size="small" icon={IconZap}>
						Button
					</Button>
					<Button size="small" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button size="small" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="size: medium">
				<View gap={4} direction="row">
					<Button icon={IconZap}>Button</Button>
					<Button variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="size: large">
				<View gap={4} direction="row">
					<Button size="large" icon={IconZap}>
						Button
					</Button>
					<Button size="large" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button size="large" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="size: xlarge">
				<View gap={4} direction="row">
					<Button size="xlarge" icon={IconZap}>
						Button
					</Button>
					<Button size="xlarge" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button size="xlarge" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="size: large, [m+] medium">
				<Button size={{ s: "large", m: "medium" }} icon={IconZap}>
					Responsive
				</Button>
			</Example.Item>
		</Example>
	),
};

export const elevated = {
	name: "elevated",
	render: () => (
		<Example>
			<Example.Item title="elevated, color: neutral">
				<View direction="row" gap={4}>
					<Button elevated onClick={() => {}}>
						Button
					</Button>
					<Button elevated variant="outline" onClick={() => {}}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="elevated, color">
				<View direction="row" gap={4}>
					<Button elevated color="primary">
						Button
					</Button>
					<Button elevated variant="outline" color="primary">
						Button
					</Button>
					<View backgroundColor="primary" padding={4} borderRadius="medium">
						<Button color="media" elevated>
							Button
						</Button>
					</View>
				</View>
			</Example.Item>
		</Example>
	),
};

export const rounded = {
	name: "rounded",
	render: () => (
		<Example>
			<Example.Item title="rounded, size: small, all variants">
				<View gap={3} direction="row">
					<Button rounded size="small" icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="outline" size="small" icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="ghost" size="small" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="rounded, size: medium, all variants">
				<View gap={3} direction="row">
					<Button rounded icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="rounded, size: large, all variants">
				<View gap={3} direction="row">
					<Button rounded size="large" icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="outline" size="large" icon={IconZap}>
						Button
					</Button>
					<Button rounded variant="ghost" size="large" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="rounded, icon only, all sizes">
				<View gap={3} direction="row">
					<Button rounded size="small" icon={IconZap} />
					<Button rounded icon={IconZap} />
					<Button rounded size="large" icon={IconZap} />
				</View>
			</Example.Item>
		</Example>
	),
};

export const fullWidth = {
	name: "fullWidth",
	render: () => (
		<Example>
			<Example.Item title="fullWidth, all variants">
				<View gap={3}>
					<Button fullWidth>Neutral</Button>
					<Button fullWidth variant="faded">
						Faded
					</Button>
					<Button fullWidth variant="outline">
						Outline
					</Button>
					<Button fullWidth variant="ghost">
						Ghost
					</Button>
				</View>
			</Example.Item>

			<Example.Item title={["responsive fullWidth", "[s] true", "[m+] false"]}>
				<Button fullWidth={{ s: true, m: false }}>Button</Button>
			</Example.Item>
		</Example>
	),
};

export const loading = {
	name: "loading",
	render: () => (
		<Example>
			<Example.Item title="loading, color: neutral, all variants">
				<View gap={3} direction="row">
					<Button loading loadingAriaLabel="Loading">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" variant="faded">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" variant="outline">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" variant="ghost">
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="loading, color critical, all variants">
				<View gap={3} direction="row">
					<Button loading loadingAriaLabel="Loading" color="critical">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="critical" variant="faded">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="critical" variant="outline">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="critical" variant="ghost">
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="loading, color positive, all variants">
				<View gap={3} direction="row">
					<Button loading loadingAriaLabel="Loading" color="positive">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="positive" variant="faded">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="positive" variant="outline">
						Button
					</Button>
					<Button loading loadingAriaLabel="Loading" color="positive" variant="ghost">
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="loading, color: media">
				<View aspectRatio={16 / 9}>
					<Image src={imgUrl} />

					<div style={{ position: "absolute", top: 16, left: 16 }}>
						<View gap={3} direction="row">
							<Button color="media" loading loadingAriaLabel="Loading">
								Button
							</Button>
							<Button color="media" variant="faded" loading loadingAriaLabel="Loading">
								Button
							</Button>
						</View>
					</div>
				</View>
			</Example.Item>

			<Example.Item title={["loading, long button text", "button size should stay the same"]}>
				<Button loading loadingAriaLabel="Loading" color="primary">
					Long button text
				</Button>
			</Example.Item>

			<Example.Item title={["loading, icon only", "button keep square 1/1 ratio"]}>
				<Button icon={IconZap} rounded loading loadingAriaLabel="Loading" />
			</Example.Item>
		</Example>
	),
};

export const highlighted = {
	name: "highlighted",
	render: () => (
		<Example>
			<Example.Item title="highlighted, color: neutral, all variants">
				<View gap={3} direction="row">
					<Button highlighted icon={IconZap}>
						Button
					</Button>
					<Button highlighted variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button highlighted variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button highlighted variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="highlighted, color: critical, all variants">
				<View gap={3} direction="row">
					<Button highlighted color="critical" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="critical" variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="critical" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="critical" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="highlighted, color: positive, all variants">
				<View gap={3} direction="row">
					<Button highlighted color="positive" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="positive" variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="positive" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button highlighted color="positive" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled, color: neutral, all variants">
				<View gap={3} direction="row">
					<Button disabled icon={IconZap} onClick={() => {}}>
						Button
					</Button>
					<Button disabled variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button disabled variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button disabled variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="disabled, color: critical, all variants">
				<View gap={3} direction="row">
					<Button disabled color="critical" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="critical" variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="critical" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="critical" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>
			<Example.Item title="disabled, color: positive, all variants">
				<View gap={3} direction="row">
					<Button disabled color="positive" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="positive" variant="faded" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="positive" variant="outline" icon={IconZap}>
						Button
					</Button>
					<Button disabled color="positive" variant="ghost" icon={IconZap}>
						Button
					</Button>
				</View>
			</Example.Item>

			<Example.Item title="disabled, color: media">
				<View aspectRatio={16 / 9}>
					<Image src={imgUrl} />

					<div style={{ position: "absolute", top: 16, left: 16 }}>
						<View gap={3} direction="row">
							<Button color="media" disabled>
								Button
							</Button>
							<Button color="media" variant="faded" disabled>
								Button
							</Button>
						</View>
					</div>
				</View>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const aligner = {
	name: "aligner",
	render: () => (
		<Example>
			<Example.Item title="aligner: all">
				<View padding={4} borderColor="neutral-faded" direction="row" gap={2}>
					<View.Item grow>Content</View.Item>
					<Button.Aligner>
						<Button icon={IconZap} variant="ghost" size="small" />
					</Button.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="aligner: top">
				<View padding={4} borderColor="neutral-faded" direction="row" gap={2}>
					<View.Item grow>
						<Placeholder />
					</View.Item>
					<Button.Aligner side="top">
						<Button icon={IconZap} variant="ghost" />
					</Button.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="aligner: top and end">
				<View padding={4} borderColor="neutral-faded" direction="row" gap={2}>
					<View.Item grow>
						<Placeholder />
					</View.Item>
					<Button.Aligner side={["top", "end"]}>
						<Button icon={IconZap} variant="ghost" />
					</Button.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="aligner: bottom">
				<View padding={4} borderColor="neutral-faded" direction="row" gap={2} align="end">
					<View.Item grow>
						<Placeholder />
					</View.Item>
					<Button.Aligner side="bottom">
						<Button icon={IconZap} variant="ghost" />
					</Button.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="aligner: start">
				<View padding={4} borderColor="neutral-faded" gap={2} align="start">
					<View.Item grow>
						<Placeholder />
					</View.Item>
					<Button.Aligner side="start">
						<Button icon={IconZap} variant="ghost" />
					</Button.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="aligner: end">
				<View padding={4} borderColor="neutral-faded" gap={2} align="end">
					<View.Item grow>
						<Placeholder />
					</View.Item>
					<Button.Aligner side="end">
						<Button icon={IconZap} variant="ghost" />
					</Button.Aligner>
				</View>
			</Example.Item>
		</Example>
	),
};

export const composition = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="slot gap">
				<Button variant="outline">
					<Avatar size={6} initials="RS" />
					Label
					<Hotkey>B</Hotkey>
				</Button>
			</Example.Item>
		</Example>
	),
};

export const href: StoryObj = {
	name: "href",
	render: () => <Button href="https://reshaped.so">Trigger</Button>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("link");

		expect(el).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <Button onClick={args.handleClick}>Trigger</Button>,
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getAllByRole("button")[0];

		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const hrefOnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "href, onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => (
		<Button
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</Button>
	),
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getByRole("link");

		await userEvent.click(el);

		expect(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const as: StoryObj = {
	name: "as",
	render: () => (
		<Example>
			<Example.Item title="as: span">
				<Button onClick={() => {}} as="span">
					Trigger
				</Button>
			</Example.Item>
			<Example.Item title="render, disabled">
				<Button
					disabled
					onClick={() => {}}
					render={(props) => <section {...props} />}
					attributes={{ "data-testid": "render-el" }}
				>
					Trigger
				</Button>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [asEl] = canvas.getAllByText("Trigger");
		const renderEl = canvas.getByTestId("render-el");

		expect(asEl.tagName).toBe("SPAN");

		expect(renderEl.tagName).toBe("SECTION");
		expect(renderEl).toHaveAttribute("aria-disabled", "true");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Button className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</Button>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const group: StoryObj = {
	name: "group",
	render: () => (
		<Example>
			<Example.Item title="with icon">
				<Button.Group>
					<Button rounded>Submit</Button>
					<Button rounded icon={IconZap} />
				</Button.Group>
			</Example.Item>
			<Example.Item title="variant: solid">
				<View gap={2}>
					{(["neutral", "primary", "critical", "positive", "media"] as const).map((color) => (
						<Button.Group key={color}>
							<Button color={color}>One</Button>
							<Button color={color}>Two</Button>
							<Button color={color}>Three</Button>
						</Button.Group>
					))}
				</View>
			</Example.Item>
			<Example.Item title="variant: outline">
				<View gap={2}>
					{(["neutral", "primary", "critical", "positive"] as const).map((color) => (
						<Button.Group key={color}>
							<Button color={color} variant="outline">
								One
							</Button>
							<Button color={color} variant="outline">
								Two
							</Button>
							<Button color={color} variant="outline">
								Three
							</Button>
						</Button.Group>
					))}
				</View>
			</Example.Item>
			<Example.Item title="variant: faded">
				<View gap={2}>
					{(["neutral", "primary", "critical", "positive", "media"] as const).map((color) => (
						<Button.Group key={color}>
							<Button color={color} variant="faded">
								One
							</Button>
							<Button color={color} variant="faded">
								Two
							</Button>
							<Button color={color} variant="faded">
								Three
							</Button>
						</Button.Group>
					))}
				</View>
			</Example.Item>

			<Example.Item title="variant: ghost">
				<View gap={2}>
					{(["neutral", "primary", "critical", "positive"] as const).map((color) => (
						<Button.Group key={color}>
							<Button color={color} variant="ghost">
								One
							</Button>
							<Button color={color} variant="ghost">
								Two
							</Button>
							<Button color={color} variant="ghost">
								Three
							</Button>
						</Button.Group>
					))}
				</View>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const [el] = canvas.getAllByRole("group");

		expect(el).toBeInTheDocument();
		expect(el.childElementCount).toEqual(2);
	},
};

export const groupFullWidth: StoryObj = {
	name: "group, fullWidth",
	render: () => (
		<Example>
			<Example.Item title="fullWidth">
				<Button.Group>
					<Button variant="outline" fullWidth>
						Button 1
					</Button>
					<Button variant="outline" fullWidth>
						Button 2
					</Button>
					<Button variant="outline">Button 3</Button>
				</Button.Group>
			</Example.Item>
		</Example>
	),
};

export const groupClassName: StoryObj = {
	name: "group className, attributes",
	render: () => (
		<div data-testid="root">
			<Button.Group className="test-classname" attributes={{ id: "test-id" }}>
				<Button>Trigger</Button>
			</Button.Group>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
