import MenuItem from "./MenuItem";
import MenuItemAligner from "./MenuItemAligner";
import type * as T from "./MenuItem.types";

const MenuItemRoot = MenuItem as unknown as React.FC<T.Props> & {
	Aligner: typeof MenuItemAligner;
};

MenuItemRoot.Aligner = MenuItemAligner;

export default MenuItemRoot;
export type { Props as MenuItemProps } from "./MenuItem.types";
