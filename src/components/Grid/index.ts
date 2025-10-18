import Grid, { GridItem } from "./Grid";

const GridRoot = Grid as typeof Grid & {
	Item: typeof GridItem;
};

GridRoot.Item = GridItem;

export default GridRoot;
export type { Props as GridProps, ItemProps as GridItemProps } from "./Grid.types";
