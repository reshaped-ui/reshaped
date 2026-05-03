"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import View from "@/components/View";
import useDrag from "@/hooks/_internal/useDrag";
import type * as T from "./Resizable.types";
import { ResizableContext } from "./ResizableContext";
import s from "./Resizable.module.css";

const ResizableHandle: React.FC<T.HandleProps> = (props) => {
	const { children } = props;
	const { containerRef, onDrag, direction } = React.useContext(ResizableContext);
	const { ref, active } = useDrag(
		(args) => {
			if (!ref.current) return;
			onDrag({ ...args, handleEl: ref.current });
		},
		{
			containerRef,
			orientation: direction === "row" ? "horizontal" : "vertical",
		}
	);
	const handleClassNames = classNames(s.handle, active && s["handle--dragging"]);

	if (children)
		return (
			<View.Item>
				{children({ ref }, { direction, status: active ? "dragging" : "idle" })}
			</View.Item>
		);

	return (
		<View.Item
			className={handleClassNames}
			attributes={{
				role: "button",
				tabIndex: 0,
				"aria-hidden": true,
				ref: (el) => {
					// @ts-ignore
					ref.current = el;
				},
			}}
		/>
	);
};

export default ResizableHandle;
