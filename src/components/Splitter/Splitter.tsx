"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useDrag from "hooks/useDrag";
import View from "components/View";
import type * as T from "./Splitter.types";
import s from "./Splitter.module.css";

const PrivateSplitterHandle = (props: T.PrivateHandleProps) => {
	const { containerRef, onDrag, index } = props;
	const { ref, active } = useDrag(
		(args) => {
			onDrag({ ...args, index });
		},
		{
			containerRef,
		}
	);
	const handleClassNames = classNames(s.handle, active && s["handle--dragging"]);

	return <div className={handleClassNames} role="button" tabIndex={0} ref={ref} />;
};

const PrivateSplitterItem = React.forwardRef(
	(props: T.PrivateItemProps, ref: React.Ref<HTMLDivElement>) => {
		const { children } = props;

		return (
			<View.Item grow className={s.item} attributes={{ ref, style: { flexGrow: 1 } }}>
				{children}
			</View.Item>
		);
	}
);

const Splitter = (props: T.Props) => {
	const { children, height, className, attributes } = props;
	const rootClassNames = classNames(s.root, className);
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const itemsRef = React.useRef<(HTMLDivElement | null)[]>([]);

	let currentHandleIndex = 0;
	let currentItemIndex = 0;
	itemsRef.current = [];

	const onDrag: T.PrivateHandleProps["onDrag"] = (args) => {
		const { index, x } = args;
		const startItem = itemsRef.current[index];
		const endItem = itemsRef.current[index + 1];
		const container = containerRef.current;

		if (!startItem || !endItem || !container) return;

		const itemsCount = itemsRef.current.length;
		const startWidth = startItem.clientWidth;
		const endWidth = endItem.clientWidth;
		const gapWidth = (itemsRef.current.length - 2) * 16;
		const currentItemsWidth = startWidth + endWidth + gapWidth;
		// x is calculated based on container but we're changing grow based on current items
		// startItem might be not in the left 0 position
		const percent = Math.min(1, Math.max(0, (x - startItem.offsetLeft) / currentItemsWidth));

		/**
		 * Each item has flex-grow of 1 as base
		 * In case other items sizes were changed the ratio of current items should grow or reduce
		 */
		const restGrow = itemsRef.current.reduce((acc, cur, i) => {
			if (i === index || i === index + 1) return acc;
			return acc + Number(cur?.style.flexGrow);
		}, 0);
		const itemsGrowRatio = itemsCount - restGrow;

		startItem.style.flexGrow = (percent * itemsGrowRatio).toString();
		endItem.style.flexGrow = ((1 - percent) * itemsGrowRatio).toString();
	};

	const output = React.Children.map(children, (child) => {
		const isComponent = React.isValidElement(child);

		if (isComponent && child.type === Splitter.Handle && child.props) {
			return (
				<PrivateSplitterHandle
					{...(child.props as T.HandleProps)}
					containerRef={containerRef}
					index={currentHandleIndex++}
					onDrag={onDrag}
				/>
			);
		}

		if (isComponent && child.type === Splitter.Item && child.props) {
			const index = currentHandleIndex;

			return (
				<PrivateSplitterItem
					{...(child.props as T.ItemProps)}
					index={currentItemIndex++}
					ref={(el) => (itemsRef.current[index] = el)}
				/>
			);
		}

		return null;
	});

	return (
		<View
			attributes={{ ...attributes, ref: containerRef }}
			className={rootClassNames}
			height={height}
			direction="row"
			align="stretch"
			gap={2}
		>
			{output}
		</View>
	);
};

Splitter.Item = (() => null) as React.FC<T.ItemProps>;
Splitter.Handle = (() => null) as React.FC<T.HandleProps>;

export default Splitter;
