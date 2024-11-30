"use client";

import Theme from "components/Theme";
import Text from "components/Text";
import Flyout from "components/_private/Flyout";
import type * as T from "./Tooltip.types";
import s from "./Tooltip.module.css";

const Tooltip = (props: T.Props) => {
	const {
		id,
		text,
		children,
		onOpen,
		onClose,
		position = "bottom",
		containerRef,
		contentGap,
		contentShift,
		active,
		disabled,
		disableContentHover,
	} = props;

	if (!text) return children({});

	return (
		<Flyout
			id={id}
			active={active}
			position={position}
			disabled={disabled}
			contentGap={contentGap}
			contentShift={contentShift}
			onOpen={onOpen}
			onClose={onClose}
			disableContentHover={disableContentHover}
			containerRef={containerRef}
			triggerType="hover"
			groupTimeouts
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
