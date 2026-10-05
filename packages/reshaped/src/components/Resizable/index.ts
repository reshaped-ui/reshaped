import Resizable, { ResizableItem } from "./Resizable.js";
import ResizableHandle from "./ResizableHandle.js";

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
} from "./Resizable.types.js";
