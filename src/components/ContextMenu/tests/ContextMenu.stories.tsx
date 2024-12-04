import { Example } from "utilities/storybook";
import ContextMenu from "components/ContextMenu";
import View from "components/View";
import ScrollArea from "components/ScrollArea";

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
			<ScrollArea height="200px">
				<ContextMenu>
					<View height="400px" backgroundColor="neutral-faded" borderRadius="medium" />

					<ContextMenu.Content>
						<ContextMenu.Item>Item 1</ContextMenu.Item>
						<ContextMenu.Item>Item 2</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>
			</ScrollArea>
		</Example.Item>
	</Example>
);
