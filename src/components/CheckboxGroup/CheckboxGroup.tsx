import CheckboxGroupControlled from "./CheckboxGroupControlled";
import CheckboxGroupUncontrolled from "./CheckboxGroupUncontrolled";
import type * as T from "./CheckboxGroup.types";

const CheckboxGroup = (props: T.Props) => {
	const { value } = props;

	if (value !== undefined) return <CheckboxGroupControlled {...(props as T.ControlledProps)} />;
	return <CheckboxGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
