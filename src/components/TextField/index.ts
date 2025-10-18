import Aligner from "components/_private/Aligner";
import TextField from "./TextField";
import type * as T from "./TextField.types";

const TextFieldRoot = TextField as React.FC<T.Props> & {
	Aligner: typeof Aligner;
};

TextFieldRoot.Aligner = Aligner;

export default TextFieldRoot;
export type { Props as TextFieldProps, BaseProps as TextFieldBaseProps } from "./TextField.types";
