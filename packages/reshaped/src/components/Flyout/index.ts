import Flyout from "./Flyout.js";
import FlyoutContent from "./FlyoutContent.js";
import FlyoutTrigger from "./FlyoutTrigger.js";

const FlyoutRoot = Flyout as typeof Flyout & {
	Trigger: typeof FlyoutTrigger;
	Content: typeof FlyoutContent;
};

FlyoutRoot.Trigger = FlyoutTrigger;
FlyoutRoot.Content = FlyoutContent;

export default FlyoutRoot;
export { useFlyoutContext } from "./Flyout.context.js";
export type {
	CloseReason as FlyoutCloseReason,
	ContentProps as FlyoutContentProps,
	Instance as FlyoutInstance,
	Props as FlyoutProps,
	TriggerAttributes as FlyoutTriggerAttributes,
	TriggerProps as FlyoutTriggerProps,
} from "./Flyout.types.js";
