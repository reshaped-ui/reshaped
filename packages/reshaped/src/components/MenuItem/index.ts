import MenuItem from "./MenuItem.js";
import MenuItemAligner from "./MenuItemAligner.js";

const MenuItemRoot = MenuItem as typeof MenuItem & {
	Aligner: typeof MenuItemAligner;
};

MenuItemRoot.Aligner = MenuItemAligner;

export default MenuItemRoot;
export type { Props as MenuItemProps } from "./MenuItem.types.js";
