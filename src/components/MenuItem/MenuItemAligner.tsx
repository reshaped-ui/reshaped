import Aligner, { type AlignerProps } from "components/_private/Aligner";
import s from "./MenuItem.module.css";

const MenuItemAligner = (props: AlignerProps) => {
	return (
		<Aligner {...props} side={props.side || "inline"} className={[s.aligner, props.className]} />
	);
};

export default MenuItemAligner;
