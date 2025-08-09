import React from "react";
import Reshaped from "../src/components/Reshaped";
import Button from "../src/components/Button";
import View from "../src/components/View";
import Text from "../src/components/Text";
import Hidden from "../src/components/Hidden";
import DropdownMenu from "../src/components/DropdownMenu";
import Icon from "../src/components/Icon";
import useRTL from "../src/hooks/useRTL";
import IconCheckmark from "../src/icons/Checkmark";
import { useTheme } from "../src/components/Theme";
import "../src/themes/reshaped/theme.css";
import "../src/themes/slate/theme.css";
import "../src/themes/figma/theme.css";
import "../src/themes/fragments/twitter/theme.css";

const ThemeSwitch = () => {
	const { invertColorMode, colorMode, setRootTheme, theme } = useTheme();
	const [rtl, setRTL] = useRTL();

	const handleThemeChange = (theme) => {
		setRootTheme(theme);
		localStorage.setItem("__reshaped-theme", theme);
	};

	const handleModeChange = () => {
		invertColorMode();
		localStorage.setItem("__reshaped-mode", colorMode === "dark" ? "light" : "dark");
	};

	return (
		<View
			direction="row"
			align="center"
			gap={2}
			position="fixed"
			zIndex={99}
			insetBottom={2}
			insetEnd={2}
			attributes={{ dir: "ltr", "data-chromatic": "ignore" }}
		>
			<Text variant="caption-1" weight="medium">
				<Hidden hide={{ s: false, m: true }} as="span">
					S
				</Hidden>
				<Hidden hide={{ s: true, m: false, l: true }} as="span">
					M
				</Hidden>
				<Hidden hide={{ s: true, l: false, xl: true }} as="span">
					L
				</Hidden>
				<Hidden hide={{ s: true, xl: false }} as="span">
					XL
				</Hidden>
			</Text>

			<Button onClick={() => setRTL(!rtl)} size="small">
				Toggle direction
			</Button>
			<Button onClick={handleModeChange} size="small">
				Toggle mode
			</Button>

			<DropdownMenu position="top-end" forcePosition>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button attributes={attributes} size="small">
							Switch theme
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item
						onClick={() => handleThemeChange("slate")}
						endSlot={
							theme === "slate" ? <Icon svg={IconCheckmark} color="primary" size={5} /> : undefined
						}
					>
						Slate
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onClick={() => handleThemeChange("reshaped")}
						endSlot={
							theme === "reshaped" ? (
								<Icon svg={IconCheckmark} color="primary" size={5} />
							) : undefined
						}
					>
						Reshaped
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onClick={() => handleThemeChange("figma")}
						endSlot={
							theme === "figma" ? <Icon svg={IconCheckmark} color="primary" size={5} /> : undefined
						}
					>
						Figma
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</View>
	);
};

const reshapedDecorator = (Story, { parameters }) => {
	if (parameters.disableWrapper) return <Story />;

	return (
		<React.StrictMode>
			<Reshaped
				defaultTheme={localStorage.getItem("__reshaped-theme") || "slate"}
				defaultColorMode={localStorage.getItem("__reshaped-mode") || "dark"}
				toastOptions={{ "bottom-start": { width: "440px", expanded: true } }}
			>
				<View paddingBottom={10}>
					<Story />
				</View>
				<ThemeSwitch />
			</Reshaped>
		</React.StrictMode>
	);
};

const preview = {
	decorators: [reshapedDecorator],
	parameters: {
		actions: {
			disable: true,
		},
		options: {
			storySort: {
				order: ["Components", "Utility components", "Hooks", "Utilities", "Internal"],
			},
		},
		docs: {
			codePanel: true,
		},
	},
};

export const parameters = {
	layout: "fullscreen",
	a11y: {
		config: {
			rules: [
				{
					id: "region",
					enabled: true,
				},
			],
		},
	},
};

export default preview;
