import Grid, { GridItem } from "./Grid";

const GridRoot = Grid as typeof Grid & {
	Item: typeof GridItem;
};

GridRoot.Item = GridItem;

export default GridRoot;
export type { ItemProps as GridItemProps, Props as GridProps } from "./Grid.types";
