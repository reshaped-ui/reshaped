import Flyout from "./Flyout";
import FlyoutTrigger from "./FlyoutTrigger";
import FlyoutContent from "./FlyoutContent";

const FlyoutRoot = Flyout as typeof Flyout & {
	Trigger: typeof FlyoutTrigger;
	Content: typeof FlyoutContent;
};

FlyoutRoot.Trigger = FlyoutTrigger;
FlyoutRoot.Content = FlyoutContent;

export default FlyoutRoot;
export { useFlyoutContext } from "./Flyout.context";
export type {
	Props as FlyoutProps,
	Instance as FlyoutInstance,
	TriggerProps as FlyoutTriggerProps,
	ContentProps as FlyoutContentProps,
	CloseReason as FlyoutCloseReason,
	TriggerAttributes as FlyoutTriggerAttributes,
} from "./Flyout.types";
