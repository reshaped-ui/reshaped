import SelectCustomControlled from "./SelectCustomControlled";
import SelectCustomUncontrolled from "./SelectCustomUncontrolled";

import type * as T from "./Select.types";

const SelectCustom: React.FC<T.CustomProps> = (props) => {
	const { value } = props;

	if (value !== undefined) {
		return <SelectCustomControlled {...(props as T.CustomControlledProps)} />;
	}

	return <SelectCustomUncontrolled {...props} />;
};

SelectCustom.displayName = "SelectCustom";

export default SelectCustom;
