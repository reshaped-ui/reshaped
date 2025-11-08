"use client";

import Flyout from "components/Flyout";
import Text from "components/Text";
import Theme from "components/Theme";

import s from "./Tooltip.module.css";

import type * as T from "./Tooltip.types";

const Tooltip: React.FC<T.Props> = (props) => {
	const { text, children, position = "bottom", color = "inverted", ...flyoutProps } = props;

	if (!text) return children({ ref: null });

	return (
		<Flyout {...flyoutProps} position={position} triggerType="hover" groupTimeouts>
			<Flyout.Trigger>{children}</Flyout.Trigger>
			<Flyout.Content>
				<Theme colorMode={color}>
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
