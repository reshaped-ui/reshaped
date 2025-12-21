import { useLayoutEffect, useState } from "react";

import Actionable from "components/Actionable";
import Alert from "components/Alert";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import Button from "components/Button";
import Card from "components/Card";
import DropdownMenu from "components/DropdownMenu";
import Link from "components/Link";
import Switch from "components/Switch";
import Text from "components/Text";
import TextField from "components/TextField";
import Theme, { useTheme } from "components/Theme";
import View from "components/View";
import IconZap from "icons/Mic";
import { Example } from "utilities/storybook";

import { getThemeCSS, generateThemeColors, baseThemeDefinition } from "themes";

import ThemePlayground from "./ThemesPlayground";

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

const colors = [
	"#2563eb",
	"#4f39f6",
	"#4a8200",
	"#0891b2",
	"#34d399",
	"#fe9a00",
	"#be185d",
	"#ff2056",
	"#000000",
];

export const test = () => {
	const { colorMode } = useTheme();
	const [activeColor, setColor] = useState(colors[0]);
	const [theme, setTheme] = useState("");
	const [algo, setAlgo] = useState<"wcag" | "apca">("wcag");

	useLayoutEffect(() => {
		setTheme(
			getThemeCSS(
				"test",
				{
					color: generateThemeColors({
						primary: activeColor === colors[0] ? undefined : activeColor,
					}),
				},
				{
					colorContrastAlgorithm: algo,
				}
			)
		);
	}, [activeColor, algo]);

	return (
		<>
			<style>{theme}</style>
			<Theme name="test">
				<View gap={4}>
					<View direction="row" align="center" gap={4}>
						{colors.map((color) => {
							const hex = colorMode === "dark" && color === "#000000" ? "#ffffff" : color;

							return (
								<Actionable key={color} onClick={() => setColor(color)} borderRadius="inherit">
									<View
										width={5}
										height={5}
										borderRadius="circular"
										attributes={{
											style: {
												transition: `box-shadow var(--rs-duration-fast) var(--rs-easing-standard)`,
												background: hex,
												boxShadow:
													color === activeColor
														? `0 0 0 3px var(--rs-color-background-elevation-base), 0 0 0 5px ${hex}`
														: undefined,
											},
										}}
									/>
								</Actionable>
							);
						})}
						<View.Item gapBefore="auto">
							<Switch name="algo" onChange={(args) => setAlgo(args.checked ? "apca" : "wcag")}>
								Use APCA
							</Switch>
						</View.Item>
					</View>

					<ThemePlayground />
				</View>
			</Theme>
		</>
	);
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
