import Flyout from "./Flyout";
import FlyoutContent from "./FlyoutContent";
import FlyoutTrigger from "./FlyoutTrigger";

const FlyoutRoot = Flyout as typeof Flyout & {
	Trigger: typeof FlyoutTrigger;
	Content: typeof FlyoutContent;
};

FlyoutRoot.Trigger = FlyoutTrigger;
FlyoutRoot.Content = FlyoutContent;

export default FlyoutRoot;
export { useFlyoutContext } from "./Flyout.context";
export type {
	CloseReason as FlyoutCloseReason,
	ContentProps as FlyoutContentProps,
	Instance as FlyoutInstance,
	Props as FlyoutProps,
	TriggerAttributes as FlyoutTriggerAttributes,
	TriggerProps as FlyoutTriggerProps,
} from "./Flyout.types";
