"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useDrag from "hooks/useDrag";
import View from "components/View";
import type * as T from "./Resizable.types";
import s from "./Resizable.module.css";

const PrivateSplitterHandle = React.forwardRef(
	// Using any here since we're expecting ref to be a Button element but using div with ro
	(props: T.PrivateHandleProps, handleRef: React.Ref<any>) => {
		const { containerRef, onDrag, index, direction, children } = props;
		const { ref, active } = useDrag(
			(args) => {
				onDrag({ ...args, index });
			},
			{
				containerRef,
				orientation: direction === "row" ? "horizontal" : "vertical",
			}
		);
		const handleClassNames = classNames(s.handle, active && s["handle--dragging"]);

		if (children) return <div ref={handleRef}>{children({ ref })}</div>;
		return (
			<div
				className={handleClassNames}
				role="button"
				tabIndex={0}
				ref={(el) => {
					// @ts-ignore
					ref.current = el;
					// @ts-ignore
					handleRef.current = el;
				}}
			/>
		);
	}
);

const PrivateSplitterItem = React.forwardRef(
	(props: T.PrivateItemProps, ref: React.Ref<HTMLDivElement>) => {
		const { children } = props;

		return (
			<View.Item
				grow
				className={s.item}
				attributes={{
					ref,
					style: { flexGrow: 1 },
				}}
			>
				{children}
			</View.Item>
		);
	}
);

const Splitter = (props: T.Props) => {
	const { children, height, direction = "row", gap = 2, className, attributes } = props;
	const rootClassNames = classNames(s.root, s[`--direction-${direction}`], className);
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const itemsRef = React.useRef<T.ItemsRef>([]);
	const handlesRef = React.useRef<(HTMLElement | null)[]>([]);
	const horizontal = direction === "row";

	let currentHandleIndex = 0;
	let currentItemIndex = 0;
	itemsRef.current = [];
	handlesRef.current = [];

	const checkedCrossedBoundaries = (args: {
		item: T.ItemsRef[number];
		grow: number;
		containerSize: number;
		itemsCount: number;
	}) => {
		const { item, grow, containerSize, itemsCount } = args;
		const { minSize, maxSize } = item.props;
		const nextPx = (grow / itemsCount) * containerSize;
		const minPx = minSize && Number(minSize.replace("px", ""));
		const maxPx = maxSize && Number(maxSize?.replace("px", ""));

		if (minPx && minPx > nextPx) return true;
		if (maxPx && maxPx < nextPx) return true;
		return false;
	};

	const onDrag: T.PrivateHandleProps["onDrag"] = (args) => {
		const { index, x, y } = args;
		const startItem = itemsRef.current[index];
		const endItem = itemsRef.current[index + 1];
		const container = containerRef.current;

		if (!startItem.el || !endItem.el || !container) return;

		const itemsCount = itemsRef.current.length;
		const containerSize = horizontal ? container.clientWidth : container.clientHeight;

		// Each item has a flex-grow of 1 as default and these values get updated while dragging for the items around the handle
		// Grow value of all items besides currently updating ones
		let restGrow = 0;
		// Size of each gap between the items, remainder after excluding sizes of all items and custom handles
		let gapSize = containerSize;
		itemsRef.current.forEach((item, i) => {
			if (!item.el) return;
			gapSize -= horizontal ? item.el.clientWidth : item.el.clientHeight;

			if (i === index || i === index + 1) return;
			restGrow += Number(item.el.style.flexGrow);
		}, 0);
		// Combined grow value of start and end items
		const itemsGrow = itemsCount - restGrow;

		// Also exclude the size of custom handles taking space
		handlesRef.current.forEach((el) => {
			if (!el) return;
			gapSize -= horizontal ? el.clientWidth : el.clientHeight;
		});

		// calc the size of a single gap
		gapSize /= itemsCount - 1;

		const dragCoord = horizontal ? x : y;
		const startSize = horizontal ? startItem.el.clientWidth : startItem.el.clientHeight;
		const endSize = horizontal ? endItem.el.clientWidth : endItem.el.clientHeight;
		// Calculate at which coord the area with current items start
		const currentItemsOffset = horizontal ? startItem.el.offsetLeft : startItem.el.offsetTop;
		// Total size of the dragging area
		const currentItemsSize = startSize + endSize + gapSize;
		// x is calculated based on container but we're changing grow based on current items
		const percent = Math.min(1, Math.max(0, (dragCoord - currentItemsOffset) / currentItemsSize));

		const nextStartGrow = percent * itemsGrow;
		const nextEndGrow = itemsGrow - percent * itemsGrow;

		// Validate that next grow values won't break the min/max size values
		if (
			checkedCrossedBoundaries({ item: startItem, containerSize, grow: nextStartGrow, itemsCount })
		) {
			return;
		}
		if (checkedCrossedBoundaries({ item: endItem, containerSize, grow: nextEndGrow, itemsCount })) {
			return;
		}

		startItem.el.style.flexGrow = nextStartGrow.toString();
		endItem.el.style.flexGrow = nextEndGrow.toString();
	};

	const output = React.Children.map(children, (child) => {
		const isComponent = React.isValidElement(child);

		if (isComponent && child.type === Splitter.Handle && child.props) {
			const index = currentHandleIndex;

			return (
				<PrivateSplitterHandle
					{...(child.props as T.HandleProps)}
					containerRef={containerRef}
					index={currentHandleIndex++}
					onDrag={onDrag}
					direction={direction}
					ref={(el) => (handlesRef.current[index] = el)}
				/>
			);
		}

		if (isComponent && child.type === Splitter.Item && child.props) {
			const index = currentHandleIndex;

			return (
				<PrivateSplitterItem
					{...(child.props as T.ItemProps)}
					index={currentItemIndex++}
					ref={(el) => (itemsRef.current[index] = { el, props: child.props as T.ItemProps })}
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
			direction={direction}
			align="stretch"
			gap={gap}
		>
			{output}
		</View>
	);
};

Splitter.Item = (() => null) as React.FC<T.ItemProps>;
Splitter.Handle = (() => null) as React.FC<T.HandleProps>;

export default Splitter;
