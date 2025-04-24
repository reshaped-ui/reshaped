import Aligner from "components/_private/Aligner";
import type * as T from "./Button.types";
import s from "./Button.module.css";

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
