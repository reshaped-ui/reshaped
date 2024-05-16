import React from "react";

type Props = {
	w?: string | number;
	h?: string | number;
	children?: React.ReactNode;
	inverted?: boolean;
};

const Placeholder = (props: Props) => {
	const { w = "auto", h = 50, children } = props;

	return (
		<div
			style={{
				width: w,
				height: h,
				minWidth: h,
				padding: "var(--rs-unit-x2)",
				background: "rgba(var(--rs-color-rgb-background-neutral), 0.32)",
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "var(--rs-radius-small)",
			}}
		>
			{children}
		</div>
	);
};

export default Placeholder;
