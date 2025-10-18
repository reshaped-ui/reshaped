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
	Props as ResizableProps,
	ItemProps as ResizableItemProps,
	HandleProps as ResizableHandleProps,
} from "./Resizable.types";
