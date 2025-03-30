import PinFieldControlled from "./PinFieldControlled";
import PinFieldUncontrolled from "./PinFieldUncontrolled";
import type * as T from "./PinField.types";

const PinField = (props: T.Props) => {
	const { value } = props;

	if (value !== undefined) return <PinFieldControlled {...props} />;
	return <PinFieldUncontrolled {...props} />;
};

PinField.displayName = "PinField";

export default PinField;
