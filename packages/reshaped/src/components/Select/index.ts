import Select from "./Select.js";
import SelectGroup from "./SelectGroup.js";
import SelectOption from "./SelectOption.js";

const SelectRoot = Select as typeof Select & {
	Option: typeof SelectOption;
	Group: typeof SelectGroup;
	OptionGroup: typeof SelectGroup;
};

SelectRoot.Option = SelectOption;
SelectRoot.Group = SelectGroup;
SelectRoot.OptionGroup = SelectGroup;

export default SelectRoot;
export { default as SelectTrigger } from "./SelectTrigger.js";
export type { Props as SelectProps, TriggerProps as SelectTriggerProps } from "./Select.types.js";
