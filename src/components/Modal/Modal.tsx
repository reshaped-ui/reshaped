"use client";

import React from "react";
import { classNames, responsiveVariables, responsiveClassNames } from "utilities/helpers";
import Text from "components/Text";
import Overlay from "components/Overlay";
import useElementId from "hooks/useElementId";
import type * as T from "./Modal.types";
import s from "./Modal.module.css";
import getPaddingStyles from "styles/padding";

const Context = React.createContext<T.Context>({
	id: "",
	titleMounted: false,
	setTitleMounted: () => {},
	subtitleMounted: false,
	setSubtitleMounted: () => {},
});
const useModal = () => React.useContext(Context);

const ModalTitle = (props: T.TitleProps) => {
	const { children } = props;
	const { id, setTitleMounted } = useModal();

	React.useEffect(() => {
		setTitleMounted(true);
		return () => setTitleMounted(false);
	}, [setTitleMounted]);

	return (
		<Text variant="featured-3" weight="bold" attributes={{ id: `${id}-title` }}>
			{children}
		</Text>
	);
};

const ModalSubtitle = (props: T.SubtitleProps) => {
	const { children } = props;
	const { id, setSubtitleMounted } = useModal();

	React.useEffect(() => {
		setSubtitleMounted(true);
		return () => setSubtitleMounted(false);
	}, [setSubtitleMounted]);

	return (
		<Text variant="body-3" color="neutral-faded" attributes={{ id: `${id}-subtitle` }}>
			{children}
		</Text>
	);
};

const Modal = (props: T.Props) => {
	const {
		children,
		onClose,
		active,
		size,
		padding = 4,
		position = "center",
		transparentOverlay,
		className,
		attributes,
	} = props;
	const id = useElementId();
	const [titleMounted, setTitleMounted] = React.useState(false);
	const [subtitleMounted, setSubtitleMounted] = React.useState(false);
	const paddingStyles = getPaddingStyles(padding);

	const value = React.useMemo(
		() => ({
			titleMounted,
			setTitleMounted,
			subtitleMounted,
			setSubtitleMounted,
			id,
		}),
		[id, subtitleMounted, titleMounted]
	);

	return (
		<Overlay onClose={onClose} active={active} transparent={transparentOverlay}>
			{({ active }) => {
				const rootClassNames = classNames(
					s.root,
					className,
					paddingStyles?.classNames,
					active && s["--active"],
					responsiveClassNames(s, "--position", position)
				);

				return (
					<Context.Provider value={value}>
						<div
							{...attributes}
							style={{
								...paddingStyles?.variables,
								...responsiveVariables("--rs-modal-size", size),
							}}
							aria-labelledby={titleMounted ? `${id}-title` : undefined}
							aria-describedby={subtitleMounted ? `${id}-subtitle` : undefined}
							className={rootClassNames}
							aria-modal="true"
							role="dialog"
						>
							{children}
						</div>
					</Context.Provider>
				);
			}}
		</Overlay>
	);
};

Modal.Title = ModalTitle;
Modal.Subtitle = ModalSubtitle;
export default Modal;
