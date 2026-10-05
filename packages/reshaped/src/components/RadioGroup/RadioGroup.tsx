import type * as T from "./RadioGroup.types.js";
import RadioGroupControlled from "./RadioGroupControlled.js";
import RadioGroupUncontrolled from "./RadioGroupUncontrolled.js";

const RadioGroup: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <RadioGroupControlled {...(props as T.ControlledProps)} />;
	return <RadioGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
