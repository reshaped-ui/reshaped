import type * as T from "./CheckboxGroup.types.js";
import CheckboxGroupControlled from "./CheckboxGroupControlled.js";
import CheckboxGroupUncontrolled from "./CheckboxGroupUncontrolled.js";

const CheckboxGroup: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <CheckboxGroupControlled {...(props as T.ControlledProps)} />;
	return <CheckboxGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
