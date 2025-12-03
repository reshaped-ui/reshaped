import Aligner from "components/_private/Aligner";

import TextArea from "./TextArea";

const TextAreaRoot = TextArea as typeof TextArea & {
	Aligner: typeof Aligner;
};

TextAreaRoot.Aligner = Aligner;

export default TextAreaRoot;
export type { Props as TextAreaProps } from "./TextArea.types";
