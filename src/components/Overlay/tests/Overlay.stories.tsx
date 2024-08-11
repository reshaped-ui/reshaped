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
	const baseToggle = useToggle(false);
	const transparentToggle = useToggle(false);
	const blurredToggle = useToggle(false);

	return (
		<Example>
			<Example.Item title="locks scroll">
				<Button onClick={() => baseToggle.activate()}>Open overlay</Button>
				<Overlay active={baseToggle.active} onClose={() => baseToggle.deactivate()}>
					Overlay content
				</Overlay>
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
			</Example.Item>

			<Example.Item title="blurred">
				<Button onClick={() => blurredToggle.activate()}>Open overlay</Button>
				<Overlay active={blurredToggle.active} onClose={() => blurredToggle.deactivate()} blurred>
					Overlay content
				</Overlay>
			</Example.Item>

			<div style={{ height: 1000 }} />
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

if (!window.customElements.get("custom-element")) {
	window.customElements.define("custom-element", CustomElement);
}

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
