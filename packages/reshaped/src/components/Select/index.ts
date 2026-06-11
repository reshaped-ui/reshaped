import Select from "./Select";
import SelectGroup from "./SelectGroup";
import SelectOption from "./SelectOption";

const SelectRoot = Select as typeof Select & {
	Option: typeof SelectOption;
	Group: typeof SelectGroup;
	OptionGroup: typeof SelectGroup;
};

SelectRoot.Option = SelectOption;
SelectRoot.Group = SelectGroup;
SelectRoot.OptionGroup = SelectGroup;

export default SelectRoot;
export { default as SelectTrigger } from "./SelectTrigger";
export type { Props as SelectProps, TriggerProps as SelectTriggerProps } from "./Select.types";
