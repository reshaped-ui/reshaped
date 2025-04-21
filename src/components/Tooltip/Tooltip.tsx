"use client";

import Theme from "components/Theme";
import Text from "components/Text";
import Flyout from "components/Flyout";
import type * as T from "./Tooltip.types";
import s from "./Tooltip.module.css";

const Tooltip = (props: T.Props) => {
	const { text, children, position = "bottom", ...flyoutProps } = props;

	if (!text) return children({});

	return (
		<Flyout {...flyoutProps} position={position} triggerType="hover" groupTimeouts>
			<Flyout.Trigger>{children}</Flyout.Trigger>
			<Flyout.Content>
				<Theme colorMode="inverted">
					<Text variant="caption-1" className={s.root}>
						{text}
					</Text>
				</Theme>
			</Flyout.Content>
		</Flyout>
	);
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
