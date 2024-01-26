import { Example } from "utilities/storybook";
import Overlay from "components/Overlay";
import Button from "components/Button";
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
