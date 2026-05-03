"use client";

import Flyout from "@/components/Flyout";
import Text from "@/components/Text";
import Theme from "@/components/Theme";
import type * as T from "./Tooltip.types";
import s from "./Tooltip.module.css";

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
			contentGap={flyoutProps.contentGap ?? 1.5}
			position={position}
			triggerType="hover"
			// Disable group timeouts by default since it's not controlled by the default user events
			groupTimeouts={flyoutProps.active === undefined ? true : false}
			contentMaxWidth={contentMaxWidth}
			contentClassName={s.root}
		>
			<Flyout.Trigger>{children}</Flyout.Trigger>
			<Theme colorMode={color}>
				<Flyout.Content>
					<Text variant="caption-1">{text}</Text>
				</Flyout.Content>
			</Theme>
		</Flyout>
	);
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
