import Select from "./Select";
import SelectCustom from "./SelectCustom";
import SelectOption from "./SelectOption";
import SelectGroup from "./SelectGroup";

const SelectRoot = Select as typeof Select & {
	Custom: typeof SelectCustom;
	Option: typeof SelectOption;
	Group: typeof SelectGroup;
	OptionGroup: typeof SelectGroup;
};

SelectRoot.Custom = SelectCustom;
SelectRoot.Option = SelectOption;
SelectRoot.Group = SelectGroup;
SelectRoot.OptionGroup = SelectGroup;

export default SelectRoot;
export type { Props as SelectProps } from "./Select.types";
