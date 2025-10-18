import Stepper, { StepperItem } from "./Stepper";
import type * as T from "./Stepper.types";

const StepperRoot = Stepper as React.FC<T.Props> & {
	Item: typeof StepperItem;
};

StepperRoot.Item = StepperItem;

export default StepperRoot;
export type { Props as StepperProps } from "./Stepper.types";
