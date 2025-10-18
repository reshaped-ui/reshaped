import Grid, { GridItem } from "./Grid";
import type * as T from "./Grid.types";

const GridRoot = Grid as React.FC<T.Props> & {
	Item: typeof GridItem;
};

GridRoot.Item = GridItem;

export default GridRoot;
export type { Props as GridProps, ItemProps as GridItemProps } from "./Grid.types";
