import RadioGroupControlled from "./RadioGroupControlled";
import RadioGroupUncontrolled from "./RadioGroupUncontrolled";

import type * as T from "./RadioGroup.types";

const RadioGroup: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <RadioGroupControlled {...(props as T.ControlledProps)} />;
	return <RadioGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
