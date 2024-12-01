import { Example } from "utilities/storybook";
import ContextMenu from "components/ContextMenu";
import View from "components/View";

export default {
	title: "Components/ContextMenu",
	component: ContextMenu,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/context-menu",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item title="base">
			<ContextMenu>
				<View width={50} height={50} backgroundColor="neutral-faded" borderRadius="medium" />

				<ContextMenu.Content>
					<ContextMenu.Item>Item 1</ContextMenu.Item>
					<ContextMenu.Item>Item 2</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</Example.Item>
	</Example>
);
