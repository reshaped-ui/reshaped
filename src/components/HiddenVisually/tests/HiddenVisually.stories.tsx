import React from "react";
import { Example } from "utilities/storybook";
import HiddenVisually from "components/HiddenVisually";

export default { title: "Utilities/HiddenVisually" };

export const visibility = () => (
	<Example>
		<Example.Item title="pronounced by screen readers">
			<HiddenVisually>Screen-reader only</HiddenVisually>
		</Example.Item>
	</Example>
);
