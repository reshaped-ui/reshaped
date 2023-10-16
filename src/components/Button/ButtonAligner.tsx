import React from "react";
import Aligner, { type AlignerProps } from "components/_private/Aligner";
import s from "./Button.module.css";

const ButtonAligner = (props: Omit<AlignerProps, "side"> & { position?: AlignerProps["side"] }) => {
	return <Aligner {...props} side={props.position} className={[s.aligner, props.className]} />;
};

export default ButtonAligner;
