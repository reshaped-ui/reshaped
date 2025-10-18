import Flyout from "./Flyout";
import FlyoutTrigger from "./FlyoutTrigger";
import FlyoutContent from "./FlyoutContent";
import type * as T from "./Flyout.types";

const FlyoutRoot = Flyout as React.FC<T.Props> & {
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
