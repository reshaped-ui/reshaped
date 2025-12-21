"use client";

import Flyout from "components/Flyout";
import Text from "components/Text";
import Theme from "components/Theme";

import s from "./Tooltip.module.css";

import type * as T from "./Tooltip.types";

const Tooltip: React.FC<T.Props> = (props) => {
	const {
		text,
		children,
		position = "bottom",
		color = "inverted",
		contentMaxWidth = "360px",
		...flyoutProps
	} = props;

	if (!text) return children({ ref: null });

	return (
		<Flyout
			{...flyoutProps}
			position={position}
			triggerType="hover"
			// Disable group timeouts by default since it's not controlled by the default user events
			groupTimeouts={flyoutProps.active === undefined ? true : false}
			contentMaxWidth={contentMaxWidth}
		>
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
