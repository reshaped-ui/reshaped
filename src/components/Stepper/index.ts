import Stepper, { StepperItem } from "./Stepper";

const StepperRoot = Stepper as typeof Stepper & {
	Item: typeof StepperItem;
};

StepperRoot.Item = StepperItem;

export default StepperRoot;
export type { Props as StepperProps } from "./Stepper.types";
