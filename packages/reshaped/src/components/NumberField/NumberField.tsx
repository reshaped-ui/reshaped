import type * as T from "./NumberField.types.js";
import NumberFieldControlled from "./NumberFieldControlled.js";
import NumberFieldUncontrolled from "./NumberFieldUncontrolled.js";

const NumberField: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <NumberFieldControlled {...(props as T.ControlledProps)} />;
	return <NumberFieldUncontrolled {...(props as T.UncontrolledProps)} />;
};

NumberField.displayName = "NumberField";

export default NumberField;
