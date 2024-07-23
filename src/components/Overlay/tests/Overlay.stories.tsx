import { createRoot } from "react-dom/client";
import { Example } from "utilities/storybook";
import Overlay from "components/Overlay";
import Button from "components/Button";
import Reshaped from "components/Reshaped";
import useToggle from "hooks/useToggle";

export default {
	title: "Utilities/Overlay",
	component: Overlay,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/overlay",
		},
	},
};

export const base = () => {
	const baseToggle = useToggle(true);
	const transparentToggle = useToggle(false);

	return (
		<Example>
			<Example.Item title="locks scroll">
				<Button onClick={() => baseToggle.activate()}>Open overlay</Button>
				<Overlay active={baseToggle.active} onClose={() => baseToggle.deactivate()}>
					Overlay content
				</Overlay>
				<div style={{ height: 1000 }} />
			</Example.Item>

			<Example.Item title="transparent, doesn't lock scroll">
				<Button onClick={() => transparentToggle.activate()}>Open overlay</Button>
				<Overlay
					active={transparentToggle.active}
					onClose={() => transparentToggle.deactivate()}
					transparent
				>
					Overlay content
				</Overlay>
				<div style={{ height: 1000 }} />
			</Example.Item>
		</Example>
	);
};

class CustomElement extends window.HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		if (!this.shadowRoot) return;

		const overlay = (
			<Reshaped>
				<Overlay active>Content</Overlay>
			</Reshaped>
		);
		const root = createRoot(this.shadowRoot);
		root.render(overlay);
	}
}

window.customElements.define("custom-element", CustomElement);

export const shadowDom = () => {
	return (
		<Example>
			<Example.Item>
				{/* @ts-ignore */}
				<custom-element />
			</Example.Item>
		</Example>
	);
};
