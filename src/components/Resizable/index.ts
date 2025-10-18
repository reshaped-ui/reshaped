import Resizable, { ResizableItem } from "./Resizable";
import ResizableHandle from "./ResizableHandle";
import type * as T from "./Resizable.types";

const ResizableRoot = Resizable as React.FC<T.Props> & {
	Item: typeof ResizableItem;
	Handle: typeof ResizableHandle;
};

ResizableRoot.Item = ResizableItem;
ResizableRoot.Handle = ResizableHandle;

export default ResizableRoot;
export type {
	Props as ResizableProps,
	ItemProps as ResizableItemProps,
	HandleProps as ResizableHandleProps,
} from "./Resizable.types";
