import Aligner from "@/components/_private/Aligner/index.js";
import TextField from "./TextField.js";

const TextFieldRoot = TextField as typeof TextField & {
	Aligner: typeof Aligner;
};

TextFieldRoot.Aligner = Aligner;

export default TextFieldRoot;
export type {
	BaseProps as TextFieldBaseProps,
	Props as TextFieldProps,
} from "./TextField.types.js";
