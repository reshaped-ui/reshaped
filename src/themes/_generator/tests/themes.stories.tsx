import React from "react";
import { Example } from "utilities/storybook";
import Button from "components/Button";
import Theme from "components/Theme";
import { getThemeCSS } from "themes";

export default { title: "Themes" };

const css = getThemeCSS("green", {
	color: {
		backgroundPrimary: { hex: "#1abc9c", hexDark: "#16a085" },
		backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#1abc9c" },
	},
});

const css2 = getThemeCSS("peach", {
	color: {
		backgroundPrimary: { hex: "#ffbe76" },
		backgroundPrimaryHighlighted: { hex: "#ffbe76" },
	},
});

export const behavior = () => (
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
