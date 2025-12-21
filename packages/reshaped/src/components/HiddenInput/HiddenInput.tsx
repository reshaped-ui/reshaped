import { useCheckboxGroup } from "components/CheckboxGroup";
import { useFormControl } from "components/FormControl";
import { useRadioGroup } from "components/RadioGroup";
import { classNames } from "utilities/props";

import s from "./HiddenInput.module.css";

import type * as T from "./HiddenInput.types";

const HiddenInput: React.FC<T.Props> = (props) => {
	const { type, value, className, onBlur, onFocus, onChange, attributes } = props;
	const rootClassNames = classNames(s.root, className);
	const checkboxGroup = useCheckboxGroup();
	const radioGroup = useRadioGroup();
	const formControl = useFormControl();

	const name = checkboxGroup?.name ?? radioGroup?.name ?? props.name;
	const disabled =
		formControl?.disabled ?? props.disabled ?? checkboxGroup?.disabled ?? radioGroup?.disabled;
	const checked =
		(value && (checkboxGroup?.value?.includes(value) ?? radioGroup?.value === value)) ||
		props.checked;
	const defaultChecked = checkboxGroup ? undefined : props.defaultChecked;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!name) return;

		const { checked } = event.target;
		const changeArgs = { name, value, checked, event };

		if (onChange) onChange(changeArgs);
		if (checkboxGroup?.onChange) checkboxGroup.onChange(changeArgs);
		if (radioGroup?.onChange) radioGroup.onChange(changeArgs);
	};

	return (
		<input
			{...attributes}
			className={rootClassNames}
			type={type}
			name={name}
			value={value}
			checked={checked}
			defaultChecked={defaultChecked}
			disabled={disabled}
			onChange={handleChange}
			onFocus={onFocus || attributes?.onFocus}
			onBlur={onBlur || attributes?.onBlur}
			data-rs-hidden-input
		/>
	);
};

HiddenInput.displayName = "HiddenInput";

export default HiddenInput;
