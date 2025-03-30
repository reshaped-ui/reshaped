"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useDrag from "hooks/_private/useDrag";
import View from "components/View";
import type * as T from "./Resizable.types";
import s from "./Resizable.module.css";

const PrivateResizableHandle = (props: T.PrivateHandleProps) => {
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

	if (children) return <View.Item>{children({ ref })}</View.Item>;
	return (
		<View.Item
			className={handleClassNames}
			attributes={{
				role: "button",
				tabIndex: 0,
				"aria-hidden": true,
				ref: (el) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					ref.current = el;
				},
			}}
		/>
	);
};

const PrivateResizableItem = React.forwardRef(
	(props: T.PrivateItemProps, ref: React.Ref<HTMLDivElement>) => {
		const { children, defaultSize, minSize, maxSize } = props;
		const itemRef = React.useRef<HTMLDivElement | null>(null);

		return (
			<View.Item
				grow
				className={s.item}
				attributes={{
					ref: (el) => {
						if (typeof ref === "function") ref(el);
						itemRef.current = el;
					},
					style: {
						"--rs-resizable-default-size": defaultSize,
						"--rs-resizable-min-size": minSize,
						"--rs-resizable-max-size": maxSize,
					},
				}}
			>
				{children}
			</View.Item>
		);
	}
);

const Resizable = (props: T.Props) => {
	const {
		children,
		variant = "borderless",
		height,
		direction = "row",
		gap = 2,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		s[`--direction-${direction}`],
		variant && s[`--variant-${variant}`],
		className
	);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const itemsRef = React.useRef<T.ItemsRefProps>([]);
	const horizontal = direction === "row";

	let currentHandleIndex = 0;
	let currentItemIndex = 0;
	itemsRef.current = [];

	const checkedCrossedBoundaries = (args: {
		item: T.ItemsRefProps[number];
		grow: number;
		itemsSize: number;
		itemsCount: number;
	}) => {
		const { item, grow, itemsSize, itemsCount } = args;
		const { minSize, maxSize } = item.props;
		const nextPx = (grow / itemsCount / 100) * itemsSize;
		const minPx = minSize && Number(minSize.replace("px", ""));
		const maxPx = maxSize && Number(maxSize?.replace("px", ""));

		if (minPx && minPx > nextPx) return true;
		if (maxPx && maxPx < nextPx) return true;
		return false;
	};

	const onDrag: T.PrivateHandleProps["onDrag"] = (args) => {
		const { index, x, y, triggerX, triggerY } = args;
		const startItem = itemsRef.current[index];
		const endItem = itemsRef.current[index + 1];

		if (!startItem.el || !endItem.el) return;

		const itemsCount = itemsRef.current.length;

		// Each item has a flex-grow of 1 as default and these values get updated while dragging for the items around the handle
		// Grow value of all items besides currently updating ones
		let currentItemsGrow = itemsCount * 100;
		let itemsSize = 0;
		itemsRef.current.forEach((item, i) => {
			if (!item.el) return;

			itemsSize += horizontal ? item.el.clientWidth : item.el.clientHeight;
			if (i === index || i === index + 1) return;
			currentItemsGrow -= Number(item.el.style.flexGrow || 100);
		}, 0);

		const startSize = horizontal ? startItem.el.clientWidth : startItem.el.clientHeight;
		const startOffset = horizontal ? startItem.el.offsetLeft : startItem.el.offsetTop;
		const endSize = horizontal ? endItem.el.clientWidth : endItem.el.clientHeight;

		// Handles containing triggers are located lower based on the gap and padding inside the handle
		const gapCompensation = (horizontal ? triggerX : triggerY) - startSize - startOffset;
		const dragCoord = (horizontal ? x : y) - gapCompensation;

		// Total size of the dragging area
		const currentItemsSize = startSize + endSize;
		// x is calculated based on container but we're changing grow based on current items
		const percent = Math.min(1, Math.max(0, (dragCoord - startOffset) / currentItemsSize));
		const nextStartGrow = Math.floor(percent * currentItemsGrow);
		const nextEndGrow = Math.floor(currentItemsGrow - nextStartGrow);

		// Validate that next grow values won't break the min/max size values
		if (checkedCrossedBoundaries({ item: startItem, itemsSize, grow: nextStartGrow, itemsCount })) {
			return;
		}
		if (checkedCrossedBoundaries({ item: endItem, itemsSize, grow: nextEndGrow, itemsCount })) {
			return;
		}

		startItem.el.style.flexGrow = nextStartGrow.toString();
		endItem.el.style.flexGrow = nextEndGrow.toString();
	};

	/**
	 * When passing sizes, items first get rendered with css
	 * and then have to be hydrated with flexGrow to enable correct resizing
	 */
	React.useEffect(() => {
		const growValues: number[] = [];

		// Calculate total size of items excluding gaps
		let totalItemsSize = 0;
		itemsRef.current.forEach((item) => {
			if (!item.el) return;
			totalItemsSize += horizontal ? item.el.clientWidth : item.el.clientHeight;
		});

		// Calculate flex grow values of all items rendered by css originally
		itemsRef.current.forEach((item, i) => {
			if (!item.el) return;

			const itemSizePercent =
				(horizontal ? item.el.clientWidth : item.el.clientHeight) / totalItemsSize;
			growValues[i] = itemsRef.current.length * itemSizePercent * 100;
		});

		// Apply flex grow after calculation is done to avoid layout shifts during the calculation
		itemsRef.current.forEach((item, i) => {
			if (!item.el || !growValues[i]) return;

			item.el.style.flexGrow = growValues[i].toString();
			item.el.setAttribute("data-rs-resizable-item-mounted", "");
		});
	}, [horizontal]);

	const output = React.Children.map(children, (child) => {
		const isComponent = React.isValidElement(child);

		if (isComponent && child.type === Resizable.Handle && child.props) {
			return (
				<PrivateResizableHandle
					{...(child.props as T.HandleProps)}
					containerRef={containerRef}
					index={currentHandleIndex++}
					onDrag={onDrag}
					direction={direction}
				/>
			);
		}

		if (isComponent && child.type === Resizable.Item && child.props) {
			const index = currentHandleIndex;

			return (
				<PrivateResizableItem
					{...(child.props as T.ItemProps)}
					index={currentItemIndex++}
					ref={(el) => {
						itemsRef.current[index] = { el, props: child.props as T.ItemProps };
					}}
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

Resizable.Item = (() => null) as React.FC<T.ItemProps>;
Resizable.Handle = (() => null) as React.FC<T.HandleProps>;

Resizable.displayName = "Resizable";

export default Resizable;
