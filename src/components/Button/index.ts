import Button from "./Button";
import ButtonAligner from "./ButtonAligner";
import ButtonGroup from "./ButtonGroup";

const ButtonRoot = Button as typeof Button & {
	Aligner: typeof ButtonAligner;
	Group: typeof ButtonGroup;
};

ButtonRoot.Aligner = ButtonAligner;
ButtonRoot.Group = ButtonGroup;

export default ButtonRoot;
export type {
	Props as ButtonProps,
	AlignerProps as ButtonAlignerProps,
	GroupProps as ButtonGroupProps,
} from "./Button.types";
