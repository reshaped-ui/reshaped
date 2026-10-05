import type * as T from "./Slider.types.js";
import SliderControlled from "./SliderControlled.js";
import SliderUncontrolled from "./SliderUncontrolled.js";

const Slider: React.FC<T.Props> = (props) => {
	const { min = 0, max = 100, ...rest } = props;

	if (
		("value" in props && props.value !== undefined) ||
		("minValue" in props &&
			"maxValue" in props &&
			props.minValue !== undefined &&
			props.maxValue !== undefined)
	) {
		return <SliderControlled {...(rest as T.ControlledProps)} min={min} max={max} />;
	}

	return <SliderUncontrolled {...(rest as T.UncontrolledProps)} min={min} max={max} />;
};

Slider.displayName = "Slider";

export default Slider;
