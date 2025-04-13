import NumberFieldControlled from "./NumberFieldControlled";
import NumberFieldUncontrolled from "./NumberFieldUncontrolled";
import type * as T from "./NumberField.types";

const NumberField = (props: T.Props) => {
	const { value } = props;

	if (value !== undefined) return <NumberFieldControlled {...(props as T.ControlledProps)} />;
	return <NumberFieldUncontrolled {...(props as T.UncontrolledProps)} />;
};

NumberField.displayName = "NumberField";

export default NumberField;
