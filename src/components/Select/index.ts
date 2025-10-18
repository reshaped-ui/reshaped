import Select from "./Select";
import SelectCustom from "./SelectCustom";
import SelectOption from "./SelectOption";
import SelectOptionGroup from "./SelectOptionGroup";
import type * as T from "./Select.types";

const SelectRoot = Select as React.FC<T.NativeProps> & {
	Custom: typeof SelectCustom;
	Option: typeof SelectOption;
	OptionGroup: typeof SelectOptionGroup;
};

SelectRoot.Custom = SelectCustom;
SelectRoot.Option = SelectOption;
SelectRoot.OptionGroup = SelectOptionGroup;

export default SelectRoot;
export type { Props as SelectProps } from "./Select.types";
