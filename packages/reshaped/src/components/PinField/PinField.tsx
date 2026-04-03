import type * as T from "./PinField.types";
import PinFieldControlled from "./PinFieldControlled";
import PinFieldUncontrolled from "./PinFieldUncontrolled";

const PinField: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <PinFieldControlled {...props} />;
	return <PinFieldUncontrolled {...props} />;
};

PinField.displayName = "PinField";

export default PinField;
