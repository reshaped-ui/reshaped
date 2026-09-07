import React from "react";

import Actionable from "@/components/Actionable";
import IconToggle from "@/components/IconToggle";
import IconCheckmark from "@/icons/Checkmark";
import IconClose from "@/icons/Close";

export default {
	title: "Utility components/IconToggle",
	component: IconToggle,
};

export const svg = {
	name: "svg",
	render: () => {
		const [active, setActive] = React.useState(false);

		return (
			<Actionable
				onClick={() => setActive((prev) => !prev)}
				attributes={{ style: { padding: 16 } }}
			>
				<IconToggle
					svg={active ? <IconCheckmark /> : <IconClose />}
					id={active}
					size={5}
					color={active ? "positive" : "neutral"}
				/>
			</Actionable>
		);
	},
};
