import React from "react";
import { Example } from "utilities/storybook";
import Slider from "components/Slider";

export default { title: "Components/Slider" };

export const base = () => (
	<Example>
		<Example.Item title="base">
			<Slider
				name="slider"
				range
				defaultMinValue={40}
				onChange={console.log}
				onChangeCommit={(args) => console.log("commit", args)}
				renderValue={(args) => `$${args.value}`}
			/>
		</Example.Item>
		<Example.Item title="step">
			<Slider
				name="slider2"
				range
				defaultMinValue={42}
				onChange={console.log}
				onChangeCommit={(args) => console.log("commit", args)}
				step={10}
			/>
		</Example.Item>
	</Example>
);
