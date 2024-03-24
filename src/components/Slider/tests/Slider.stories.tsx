import { Example } from "utilities/storybook";
import Slider from "components/Slider";
import FormControl from "components/FormControl";

export default {
	title: "Components/Slider",
	component: Slider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/slider",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item title="single">
			<Slider name="slider" defaultValue={30} />
		</Example.Item>
		<Example.Item title="range">
			<Slider
				range
				name="slider"
				defaultMinValue={30}
				defaultMaxValue={70}
				renderValue={() => "Hundred more times"}
			/>
		</Example.Item>
	</Example>
);

export const step = () => (
	<Example>
		<Example.Item title="float step">
			<Slider name="slider" defaultValue={30} step={0.01} />
		</Example.Item>
	</Example>
);

export const boundaries = () => (
	<Example>
		<Example.Item title="min: 20, max: 30, value: 25">
			<Slider name="slider" defaultValue={25} min={20} max={30} />
		</Example.Item>
		<Example.Item title="step: 10, value: 4, renders as 0">
			<Slider name="slider" defaultValue={4} step={10} />
		</Example.Item>
	</Example>
);

export const status = () => (
	<Example>
		<Example.Item title="disabled">
			<Slider name="slider" defaultValue={30} disabled />
		</Example.Item>
		<Example.Item title="step">
			<Slider range name="slider" defaultMinValue={30} defaultMaxValue={70} disabled />
		</Example.Item>
	</Example>
);

export const customRender = () => (
	<Example>
		<Example.Item title="custom render">
			<Slider name="slider" defaultValue={30} renderValue={(args) => `$${args.value}`} />
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title="form control, disabled">
			<FormControl disabled>
				<FormControl.Label>Slider value</FormControl.Label>
				<Slider name="slider" />
			</FormControl>
		</Example.Item>
	</Example>
);
