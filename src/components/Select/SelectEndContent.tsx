import Icon from "components/Icon";
import { responsivePropDependency } from "utilities/props";
import IconArrow from "icons/ChevronVertical";
import type * as T from "./Select.types";
import s from "./Select.module.css";

const SelectEndContent: React.FC<Pick<T.Props, "disabled" | "size">> = (props) => {
	const { disabled, size } = props;

	return (
		<div className={s.arrow}>
			<Icon
				svg={IconArrow}
				color={disabled ? "disabled" : "neutral-faded"}
				size={responsivePropDependency(size, (size) => {
					return size === "large" || size === "xlarge" ? 5 : 4;
				})}
			/>
		</div>
	);
};

export default SelectEndContent;
