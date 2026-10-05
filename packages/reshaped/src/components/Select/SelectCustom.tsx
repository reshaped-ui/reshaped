import type * as T from "./Select.types.js";
import SelectCustomControlled from "./SelectCustomControlled.js";
import SelectCustomUncontrolled from "./SelectCustomUncontrolled.js";

const SelectCustom: React.FC<T.CustomProps> = (props) => {
	const { value } = props;

	if (value !== undefined) {
		return <SelectCustomControlled {...(props as T.CustomControlledProps)} />;
	}

	return <SelectCustomUncontrolled {...props} />;
};

SelectCustom.displayName = "SelectCustom";

export default SelectCustom;
