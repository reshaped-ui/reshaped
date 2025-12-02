import Aligner from "components/_private/Aligner";

import s from "./Button.module.css";

import type * as T from "./Button.types";

const ButtonAligner: React.FC<T.AlignerProps> = (props) => {
	return (
		<Aligner
			{...props}
			side={props.side || props.position}
			className={[s.aligner, props.className]}
		/>
	);
};

ButtonAligner.displayName = "Button.Aligner";

export default ButtonAligner;
