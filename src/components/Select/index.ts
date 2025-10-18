import Select from "./Select";
import SelectCustom from "./SelectCustom";
import SelectOption from "./SelectOption";
import SelectOptionGroup from "./SelectOptionGroup";

const SelectRoot = Select as typeof Select & {
	Custom: typeof SelectCustom;
	Option: typeof SelectOption;
	OptionGroup: typeof SelectOptionGroup;
};

SelectRoot.Custom = SelectCustom;
SelectRoot.Option = SelectOption;
SelectRoot.OptionGroup = SelectOptionGroup;

export default SelectRoot;
export type { Props as SelectProps } from "./Select.types";
