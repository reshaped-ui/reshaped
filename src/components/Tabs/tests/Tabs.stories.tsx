import React from "react";
import { Example } from "utilities/storybook";
import Tabs from "components/Tabs";
import View from "components/View";
import Text from "components/Text";
import ScrollArea from "components/ScrollArea";
import IconZap from "icons/Zap";

export default {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tabs",
		},
	},
};

export const variant = () => (
	<Example>
		<Example.Item title="variant: default">
			<Tabs>
				<Tabs.List>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: pills">
			<Tabs variant="pills">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: pills-elevated">
			<Tabs variant="pills-elevated">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: borderless">
			<Tabs variant="borderless">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="variant: default, size: large">
			<Tabs size="large">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: pills, size: large">
			<Tabs variant="pills" size="large">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: pills-elevated, size: large">
			<Tabs variant="pills-elevated" size="large">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>

		<Example.Item title="variant: borderless, size: large">
			<Tabs variant="borderless" size="large">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const direction = () => (
	<Example>
		<Example.Item title="direction: column, variant: underline">
			<Tabs direction="column">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
					<Tabs.Item value="3">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
		<Example.Item title="direction: column, variant: pills">
			<Tabs direction="column" variant="pills">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
		<Example.Item title="direction: column, variant: pills-elevated">
			<Tabs direction="column" variant="pills-elevated">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const composition = () => (
	<Example>
		<Example.Item title="switching panels">
			<Tabs>
				<View gap={4}>
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>

					<Tabs.Panel value="0">Tab 1</Tabs.Panel>
					<Tabs.Panel value="1">Tab 2</Tabs.Panel>
					<Tabs.Panel value="2">Tab 3</Tabs.Panel>
				</View>
			</Tabs>
		</Example.Item>
	</Example>
);

export const icon = () => (
	<Example>
		<Example.Item title="icon">
			<Tabs>
				<Tabs.List>
					<Tabs.Item value="0" icon={IconZap}>
						Item 1
					</Tabs.Item>
					<Tabs.Item value="1" icon={IconZap}>
						Long item 2
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
		<Example.Item title="icon only">
			<Tabs variant="pills-elevated">
				<Tabs.List>
					<Tabs.Item value="0" icon={IconZap} attributes={{ "aria-label": "Tab 1" }} />
					<Tabs.Item value="1" icon={IconZap} attributes={{ "aria-label": "Tab 2" }} />
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const equalWidth = () => (
	<Example>
		<Example.Item title="equal width items">
			<Tabs onChange={console.log} itemWidth="equal">
				<Tabs.List>
					<Tabs.Item value="0" icon={IconZap}>
						Item 1
					</Tabs.Item>
					<Tabs.Item value="1" icon={IconZap}>
						Long item 2
					</Tabs.Item>
					<Tabs.Item value="2" icon={IconZap}>
						Very long item 3
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const selection = () => (
	<Example>
		<Example.Item title="value: 2, uncontrolled">
			<Tabs defaultValue="2">
				<Tabs.List>
					<Tabs.Item value="1" icon={IconZap}>
						Item 1
					</Tabs.Item>
					<Tabs.Item value="2" icon={IconZap}>
						Long item 2
					</Tabs.Item>
					<Tabs.Item value="3" icon={IconZap}>
						Very long item 3
					</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Tab 1</Tabs.Panel>
				<Tabs.Panel value="2">Tab 2</Tabs.Panel>
				<Tabs.Panel value="3">Tab 3</Tabs.Panel>
			</Tabs>
		</Example.Item>

		<Example.Item title="value: 2, controlled">
			<Tabs value="2">
				<Tabs.List>
					<Tabs.Item value="1" icon={IconZap}>
						Item 1
					</Tabs.Item>
					<Tabs.Item value="2" icon={IconZap}>
						Long item 2
					</Tabs.Item>
					<Tabs.Item value="3" icon={IconZap}>
						Very long item 3
					</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Tab 1</Tabs.Panel>
				<Tabs.Panel value="2">Tab 2</Tabs.Panel>
				<Tabs.Panel value="3">Tab 3</Tabs.Panel>
			</Tabs>
		</Example.Item>
	</Example>
);

export const navigation = () => (
	<Example>
		<Example.Item title="href, no onChange">
			<Tabs value="2">
				<Tabs.List>
					<Tabs.Item value="1" href="#item-1" icon={IconZap}>
						Item 1
					</Tabs.Item>
					<Tabs.Item value="2" href="#item-2" icon={IconZap}>
						Long item 2
					</Tabs.Item>
					<Tabs.Item value="3" href="#item-3" icon={IconZap}>
						Very long item 3
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const edgeCases = () => (
	<Example>
		<Example.Item title="Viewport overflow">
			<Tabs>
				<Tabs.List>
					{[...Array(8)].map((_, i) => (
						<Tabs.Item value={`${i}`} key={i} icon={IconZap}>
							Very long item {i}
						</Tabs.Item>
					))}
				</Tabs.List>

				{[...Array(8)].map((_, i) => (
					<Tabs.Panel value={`${i}`} key={i}>
						Tab {i}
					</Tabs.Panel>
				))}
			</Tabs>
		</Example.Item>
		<Example.Item>
			<Tabs onChange={console.log} variant="pills-elevated" name="hey">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">
						<View borderColor="neutral-faded" padding={5}>
							Item 3
						</View>
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
		<Example.Item title="Custom non-interactive list children">
			<Tabs direction="column">
				<Tabs.List>
					<Tabs.Item value="0">Item 1</Tabs.Item>
					<View height={6} backgroundColor="neutral-faded" borderRadius="small" />
					<Tabs.Item value="1">Long item 2</Tabs.Item>
					<Tabs.Item value="2">Very long item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</Example.Item>
	</Example>
);

export const edgeCaseDom = () => {
	const [activeItem, setActiveItem] = React.useState("1");
	const sectionsRef = React.useRef(null);

	return (
		<Example>
			<Example.Item title="active item changes on scroll">
				<View justify="center" align="center" padding={10}>
					<View width={60} gap={2}>
						<Tabs value={activeItem} onChange={(args) => setActiveItem(args.value)}>
							<Tabs.List>
								<Tabs.Item value="1">Item 1</Tabs.Item>
								<Tabs.Item value="2">Item 2</Tabs.Item>
								<Tabs.Item value="3">Item 3</Tabs.Item>
								<Tabs.Item value="4">Item 4</Tabs.Item>
							</Tabs.List>
						</Tabs>

						<ScrollArea
							attributes={{ ref: sectionsRef }}
							height={70}
							onScroll={(args) => {
								setActiveItem(Math.min(4, Math.floor(args.y * 10) + 1).toString());
							}}
						>
							<View gap={4}>
								<View gap={2}>
									<Text>Section 1</Text>

									<View gap={1} direction="row">
										{[...Array(4)].map((_, i) => (
											<View grow height="100px" backgroundColor="neutral-faded" key={i} />
										))}
									</View>
								</View>

								<View gap={2}>
									<Text>Section 2</Text>

									<View gap={1} direction="row">
										{[...Array(4)].map((_, i) => (
											<View key={i} grow height="100px" backgroundColor="neutral-faded" />
										))}
									</View>
								</View>

								<View gap={2}>
									<Text>Section 3</Text>

									<View gap={1} direction="row">
										{[...Array(4)].map((_, i) => (
											<View key={i} grow height="100px" backgroundColor="neutral-faded" />
										))}
									</View>
								</View>

								<View gap={2}>
									<Text>Section 4</Text>

									<View gap={1} direction="row">
										{[...Array(4)].map((_, i) => (
											<View key={i} grow height="100px" backgroundColor="neutral-faded" />
										))}
									</View>
								</View>
							</View>
						</ScrollArea>
					</View>
				</View>
			</Example.Item>
		</Example>
	);
};
