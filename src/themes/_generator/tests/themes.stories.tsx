import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import Button from "components/Button";
import Badge from "components/Badge";
import Alert from "components/Alert";
import Card from "components/Card";
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import TextField from "components/TextField";
import Theme from "components/Theme";
import IconZap from "icons/Mic";
import Link from "components/Link";
import Text from "components/Text";
import { getThemeCSS, generateThemeColors, baseThemeDefinition } from "themes";

export default {
	title: "Internal/Themes",
	parameters: {
		iframe: { url: "https://reshaped.so/docs/tokens/theming/runtime-theming" },
		a11y: {
			// This option disables all a11y checks on this story
			disable: true,
		},
	},
};

const css = getThemeCSS("green", {
	color: {
		backgroundPrimary: { hex: "#1abc9c", hexDark: "#00E5C4" },
		backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#00E5C4" },
	},
});

const css2 = getThemeCSS("peach", {
	color: {
		backgroundPrimary: { hex: "#ffbe76" },
		backgroundPrimaryHighlighted: { hex: "#ffbe76" },
	},
});

const cssGenerated = getThemeCSS("generated", {
	...baseThemeDefinition,
	color: generateThemeColors({
		primary: "#0369a1" /*"#5a58f2"*/ /* "#2563eb" */,
	}),
});

const componentExamples = (
	<View gap={4} padding={6} backgroundColor="page">
		<Text variant="featured-2">Hello world</Text>
		<Text color="neutral-faded" variant="featured-2">
			Hello world faded
		</Text>
		<Text color="disabled" variant="featured-2">
			Hello world disabled
		</Text>

		<View gap={2} direction="row">
			<Button color="primary" onClick={() => {}}>
				Primary button
			</Button>
			<Button color="critical" onClick={() => {}}>
				Critical button
			</Button>
			<Button color="positive" onClick={() => {}}>
				Positive button
			</Button>
			<View height={9} width={20} borderRadius="small" backgroundColor="warning" />
			<Button color="neutral" onClick={() => {}}>
				Neutral button
			</Button>
			<Button color="neutral" disabled onClick={() => {}}>
				Disabled button
			</Button>
		</View>
		<View gap={2} direction="row">
			<Button color="primary" variant="outline" onClick={() => {}}>
				Primary button
			</Button>
			<Button color="critical" variant="outline" onClick={() => {}}>
				Critical button
			</Button>
			<Button color="positive" variant="outline" onClick={() => {}}>
				Positive button
			</Button>
			<Button color="neutral" variant="outline" onClick={() => {}}>
				Neutral button
			</Button>
		</View>
		<View direction="row" gap={4}>
			<View.Item columns={6}>
				<Alert
					color="primary"
					title="Hello"
					icon={IconZap}
					actionsSlot={<Link color="primary">Action</Link>}
				>
					Primary
				</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert
					color="critical"
					title="Hello"
					icon={IconZap}
					actionsSlot={<Link color="critical">Action</Link>}
				>
					Critical
				</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert
					color="warning"
					title="Hello"
					icon={IconZap}
					actionsSlot={
						<Text color="warning">
							<Link color="inherit">Action</Link>
						</Text>
					}
				>
					Warning
				</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert
					color="positive"
					title="Hello"
					icon={IconZap}
					actionsSlot={<Link color="positive">Action</Link>}
				>
					Positive
				</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert
					color="neutral"
					title="Hello"
					icon={IconZap}
					actionsSlot={<Link color="primary">Action</Link>}
				>
					Neutral
				</Alert>
			</View.Item>
			<View.Item columns={12}>
				<View direction="row" gap={2}>
					<View backgroundColor="neutral" width={10} height={10} />
					<View backgroundColor="neutral-faded" width={10} height={10} />
					<View backgroundColor="primary" width={10} height={10} />
					<View backgroundColor="primary-faded" width={10} height={10} />
					<View backgroundColor="critical" width={10} height={10} />
					<View backgroundColor="critical-faded" width={10} height={10} />
					<View backgroundColor="warning" width={10} height={10} />
					<View backgroundColor="warning-faded" width={10} height={10} />
					<View backgroundColor="positive" width={10} height={10} />
					<View backgroundColor="positive-faded" width={10} height={10} />
				</View>
			</View.Item>
			<View.Item columns={12}>
				<View direction="row" gap={2}>
					<Avatar initials="RS" color="warning" variant="faded" />
					<Badge color="warning">Warning</Badge>
				</View>
			</View.Item>
			<View.Item columns={12}>
				<View direction="row">
					<View padding={4} gap={4} backgroundColor="page">
						Page
						<View backgroundColor="neutral" padding={4}>
							Neutral
						</View>
						<View backgroundColor="neutral-faded" padding={4}>
							Neutral faded
						</View>
					</View>

					<View padding={4} gap={4} backgroundColor="page-faded">
						Page faded
						<View backgroundColor="neutral" padding={4}>
							Neutral
						</View>
						<View backgroundColor="neutral-faded" padding={4}>
							Neutral faded
						</View>
					</View>
				</View>
			</View.Item>
			<View.Item columns={6}>
				<Card>
					<View gap={2} align="start">
						<Badge variant="outline" color="primary">
							Badge
						</Badge>
						<View gap={2} direction="row">
							<DropdownMenu>
								<DropdownMenu.Trigger>
									{(attributes) => (
										<Button variant="faded" attributes={attributes}>
											Menu
										</Button>
									)}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item>Item 1</DropdownMenu.Item>
									<DropdownMenu.Item>Item 1</DropdownMenu.Item>
									<br />
									<View backgroundColor="neutral-faded" padding={4}>
										Hello
									</View>
								</DropdownMenu.Content>
							</DropdownMenu>
							<Button variant="outline">Button</Button>
						</View>

						<TextField name="h" placeholder="hello" disabled />
						<TextField name="h" placeholder="hello" value="2323" />
					</View>
				</Card>
			</View.Item>
			<View.Item columns={6}>
				<Card elevated>
					<View gap={2} align="start">
						<Badge variant="outline" color="primary">
							Badge
						</Badge>

						<TextField name="h" placeholder="hello" value="2323" disabled />
						<TextField name="h" placeholder="hello" value="2323" />

						<Button color="neutral" disabled onClick={() => {}}>
							Disabled button
						</Button>
					</View>
				</Card>
			</View.Item>
		</View>
	</View>
);

export const base = () => (
	<Example>
		<Example.Item title="custom runtime theme">
			<style>{css}</style>
			<Theme name="green">
				<Button color="primary">Primary button</Button>
			</Theme>
		</Example.Item>
		<Example.Item title="on colors generation">
			<style>{css2}</style>
			<Theme name="peach">
				<Button color="primary">Primary button</Button>
			</Theme>
		</Example.Item>
	</Example>
);

export const generation = () => (
	<div>
		<style>{cssGenerated}</style>
		<Theme name="generated">{componentExamples}</Theme>
	</div>
);

const onColorsCss = getThemeCSS(
	"on-color",
	{
		color: {
			backgroundPrimary: { hex: "#1abc9c", hexDark: "#16a085" },
			backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#1abc9c" },
		},
	},
	{
		onColorValues: {
			primary: {
				hexLight: "#d1fae5",
				hexDark: "#022c22",
			},
		},
	}
);

const onColorsCssApca = getThemeCSS(
	"on-color-apca",
	{
		color: {
			backgroundPrimary: { hex: "#1abc9c", hexDark: "#16a085" },
			backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#1abc9c" },
		},
	},
	{
		colorContrastAlgorithm: "apca",
		onColorValues: {
			primary: {
				hexLight: "#d1fae5",
				hexDark: "#022c22",
			},
		},
	}
);

export const onColors = () => (
	<Example>
		<Example.Item title="custom on color values">
			<style>{onColorsCss}</style>
			<Theme name="on-color">
				<View gap={2} direction="row">
					<Button color="primary">Primary button</Button>
					<Button color="critical">Critical button</Button>
				</View>
			</Theme>
		</Example.Item>
		<Example.Item title="custom on color values, apca">
			<style>{onColorsCssApca}</style>
			<Theme name="on-color-apca">
				<View gap={2} direction="row">
					<Button color="primary">Primary button</Button>
					<Button color="critical">Critical button</Button>
				</View>
			</Theme>
		</Example.Item>
	</Example>
);
