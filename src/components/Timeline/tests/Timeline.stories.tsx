import { Example, Placeholder } from "utilities/storybook";
import Timeline from "components/Timeline";

export default {
	title: "Components/Timeline",
	component: Timeline,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/timeline",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item title="children passed directly">
			<Timeline>
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</Timeline>
		</Example.Item>
		<Example.Item title="children wrapped with Timeline.Item">
			<Timeline>
				<Timeline.Item>
					<Placeholder />
				</Timeline.Item>
				<Timeline.Item>
					<Placeholder />
				</Timeline.Item>
				<Timeline.Item>
					<Placeholder />
				</Timeline.Item>
			</Timeline>
		</Example.Item>
	</Example>
);

export const marker = () => (
	<Example>
		<Example.Item title="slot">
			<Timeline>
				<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
					<Placeholder />
				</Timeline.Item>
				<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
					<Placeholder />
				</Timeline.Item>
				<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
					<Placeholder />
				</Timeline.Item>
			</Timeline>
		</Example.Item>

		<Example.Item title="null marker">
			<Timeline>
				<Timeline.Item markerSlot={null}>
					<Placeholder />
				</Timeline.Item>
				<Timeline.Item markerSlot={null}>
					<Placeholder />
				</Timeline.Item>
			</Timeline>
		</Example.Item>
	</Example>
);
