"use client";

import Theme from "components/Theme";
import Text from "components/Text";
import Flyout from "components/_private/Flyout";
import type * as T from "./Tooltip.types";
import s from "./Tooltip.module.css";

const Tooltip = (props: T.Props) => {
	const { id, text, children, onOpen, onClose, position = "bottom", active } = props;

	if (!text) return <>{children({})}</>;

	return (
		<Flyout
			id={id}
			active={active}
			position={position}
			onOpen={onOpen}
			onClose={onClose}
			triggerType="hover"
		>
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

export default Tooltip;
