import MenuItem from "./MenuItem";
import MenuItemAligner from "./MenuItemAligner";

const MenuItemRoot = MenuItem as typeof MenuItem & {
	Aligner: typeof MenuItemAligner;
};

MenuItemRoot.Aligner = MenuItemAligner;

export default MenuItemRoot;
export type { Props as MenuItemProps } from "./MenuItem.types";
