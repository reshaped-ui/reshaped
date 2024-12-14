import { render as vitestRender } from "vitest-browser-react";
import Reshaped from "components/Reshaped";
import "themes/reshaped/theme.css";

const Wrapper = (props: { children: React.ReactNode }) => {
	return <Reshaped>{props.children}</Reshaped>;
};

const render = (node: React.ReactNode) => {
	const screen = vitestRender(<div id="root">{node}</div>, {
		wrapper: Wrapper,
	});

	return { ...screen, container: document.getElementById("root")! };
};

export default render;
