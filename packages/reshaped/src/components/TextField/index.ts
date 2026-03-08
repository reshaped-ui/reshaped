import Aligner from "@/components/_private/Aligner";

import TextField from "./TextField";

const TextFieldRoot = TextField as typeof TextField & {
	Aligner: typeof Aligner;
};

TextFieldRoot.Aligner = Aligner;

export default TextFieldRoot;
export type { BaseProps as TextFieldBaseProps, Props as TextFieldProps } from "./TextField.types";
