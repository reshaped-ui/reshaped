import Icon from "components/Icon";
import { responsivePropDependency } from "utilities/props";

import s from "./Select.module.css";

import type * as T from "./Select.types";

const SelectStartContent: React.FC<Pick<T.Props, "startSlot" | "icon" | "size">> = (props) => {
	const { startSlot, icon, size } = props;

	if (!startSlot && !icon) return null;

	if (icon) {
		return (
			<div className={s.slot}>
				<Icon
					size={responsivePropDependency(size, (size) => {
						if (size === "large") return 5;
						if (size === "xlarge") return 6;
						return 4;
					})}
					svg={icon}
				/>
			</div>
		);
	}

	return <div className={s.slot}>{startSlot}</div>;
};

export default SelectStartContent;
