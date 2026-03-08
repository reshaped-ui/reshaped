import Resizable, { ResizableItem } from "./Resizable";
import ResizableHandle from "./ResizableHandle";

const ResizableRoot = Resizable as typeof Resizable & {
	Item: typeof ResizableItem;
	Handle: typeof ResizableHandle;
};

ResizableRoot.Item = ResizableItem;
ResizableRoot.Handle = ResizableHandle;

export default ResizableRoot;
export type {
	HandleProps as ResizableHandleProps,
	ItemProps as ResizableItemProps,
	Props as ResizableProps,
} from "./Resizable.types";
