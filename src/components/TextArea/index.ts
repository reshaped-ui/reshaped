import Aligner from "components/_private/Aligner";
import TextArea from "./TextArea";
import type * as T from "./TextArea.types";

const TextAreaRoot = TextArea as React.FC<T.Props> & {
	Aligner: typeof Aligner;
};

TextAreaRoot.Aligner = Aligner;

export default TextAreaRoot;
export type { Props as TextAreaProps } from "./TextArea.types";
