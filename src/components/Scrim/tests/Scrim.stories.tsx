import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import Scrim from "components/Scrim";

export default { title: "Components/Scrim" };

export const position = () => (
	<Example>
		<Example.Item title="position: center">
			<Scrim backgroundSlot={<Placeholder h={200} />}>Scrim</Scrim>
		</Example.Item>

		<Example.Item title="position: bottom">
			<Scrim position="bottom" backgroundSlot={<Placeholder h={200} />}>
				Scrim
			</Scrim>
		</Example.Item>

		<Example.Item title="position: top">
			<Scrim position="top" backgroundSlot={<Placeholder h={200} />}>
				Scrim
			</Scrim>
		</Example.Item>

		<Example.Item title="position: start">
			<Scrim position="start" backgroundSlot={<Placeholder h={200} />}>
				Scrim
			</Scrim>
		</Example.Item>

		<Example.Item title="position: end">
			<Scrim position="end" backgroundSlot={<Placeholder h={200} />}>
				Scrim
			</Scrim>
		</Example.Item>
	</Example>
);

export const composition = () => (
	<Example>
		<Example.Item title="without backgroundSlot, size is based on the parent component">
			<div style={{ height: 300, position: "relative" }}>
				<Scrim>Text</Scrim>
			</div>
		</Example.Item>
	</Example>
);
