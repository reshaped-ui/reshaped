import type * as T from "./Select.types";

/**
 * Holds the selected value for the form submission,
 * shared between the default and the custom trigger rendering
 */
const SelectHiddenInput: React.FC<T.HiddenInputProps> = (props) => {
	const { value, name, id, inputAttributes } = props;

	return (
		<input
			{...inputAttributes}
			type="hidden"
			value={typeof value === "string" ? value : JSON.stringify(value)}
			name={name}
			id={id}
		/>
	);
};

SelectHiddenInput.displayName = "SelectHiddenInput";

export default SelectHiddenInput;
