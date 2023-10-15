import React from "react";
import Aligner, { type AlignerProps } from "components/_private/Aligner";
import s from "./MenuItem.module.css";

const MenuItemAligner = (props: Omit<AlignerProps, "side">) => {
	return <Aligner {...props} side="inline" className={[s.aligner, props.className]} />;
};

export default MenuItemAligner;
