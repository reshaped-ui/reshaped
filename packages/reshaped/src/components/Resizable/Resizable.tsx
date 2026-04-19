"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import View from "@/components/View";
import type * as T from "./Resizable.types";
import { ResizableContext } from "./ResizableContext";
import s from "./Resizable.module.css";

export const ResizableItem: React.FC<T.ItemProps> = (props) => {
	const { children, defaultSize, minSize, maxSize } = props;
	const { registerItem } = React.useContext(ResizableContext);
	const itemRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const el = itemRef.current;
		if (!el || !registerItem) return;
		return registerItem(el, { minSize, maxSize });
	}, [registerItem, minSize, maxSize]);

	return (
		<View.Item
			grow
			className={s.item}
			attributes={{
				ref: itemRef,
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
};

const Resizable: React.FC<T.Props> = (props) => {
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
	const itemsRef = React.useRef(
		new Map<HTMLDivElement, Pick<T.ItemProps, "minSize" | "maxSize">>()
	);
	const horizontal = direction === "row";

	const registerItem = React.useCallback<T.Context["registerItem"]>((el, props) => {
		itemsRef.current.set(el, props);
		return () => itemsRef.current.delete(el);
	}, []);

	const getSortedItems = React.useCallback(() => {
		return Array.from(itemsRef.current.entries()).sort(([a], [b]) =>
			a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
		);
	}, []);

	const checkedCrossedBoundaries = (args: {
		itemProps: Pick<T.ItemProps, "minSize" | "maxSize">;
		grow: number;
		itemsSize: number;
		itemsCount: number;
	}) => {
		const { itemProps, grow, itemsSize, itemsCount } = args;
		const { minSize, maxSize } = itemProps;
		const nextPx = (grow / itemsCount / 100) * itemsSize;
		const minPx = minSize && Number(minSize.replace("px", ""));
		const maxPx = maxSize && Number(maxSize?.replace("px", ""));

		if (minPx && minPx > nextPx) return true;
		if (maxPx && maxPx < nextPx) return true;
		return false;
	};

	const onDrag = React.useCallback<T.Context["onDrag"]>(
		(args) => {
			const { handleEl, x, y, triggerX, triggerY } = args;
			const sortedItems = getSortedItems();
			if (sortedItems.length < 2) return;

			// Find the first registered item that appears after the handle in DOM order
			const endIdx = sortedItems.findIndex(
				([el]) =>
					// eslint-disable-next-line no-bitwise
					!!(handleEl.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)
			);
			if (endIdx <= 0) return;

			const [startEl, startItemProps] = sortedItems[endIdx - 1];
			const [endEl, endItemProps] = sortedItems[endIdx];
			const itemsCount = sortedItems.length;

			// Each item has a flex-grow of 1 as default and these values get updated while dragging for the items around the handle
			// Grow value of all items besides currently updating ones
			let currentItemsGrow = itemsCount * 100;
			let itemsSize = 0;

			sortedItems.forEach(([el], i) => {
				itemsSize += horizontal ? el.clientWidth : el.clientHeight;
				if (i === endIdx - 1 || i === endIdx) return;
				currentItemsGrow -= Number(el.style.flexGrow || 100);
			});

			const startSize = horizontal ? startEl.clientWidth : startEl.clientHeight;
			const startOffset = horizontal ? startEl.offsetLeft : startEl.offsetTop;
			const endSize = horizontal ? endEl.clientWidth : endEl.clientHeight;

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
			if (
				checkedCrossedBoundaries({
					itemProps: startItemProps,
					itemsSize,
					grow: nextStartGrow,
					itemsCount,
				})
			) {
				return;
			}
			if (
				checkedCrossedBoundaries({
					itemProps: endItemProps,
					itemsSize,
					grow: nextEndGrow,
					itemsCount,
				})
			) {
				return;
			}

			startEl.style.flexGrow = nextStartGrow.toString();
			endEl.style.flexGrow = nextEndGrow.toString();
		},
		[getSortedItems, horizontal]
	);

	/**
	 * When passing sizes, items first get rendered with css
	 * and then have to be hydrated with flexGrow to enable correct resizing
	 */
	React.useEffect(() => {
		const sortedItems = getSortedItems();
		const growValues: number[] = [];

		// Calculate total size of items excluding gaps
		let totalItemsSize = 0;
		sortedItems.forEach(([el]) => {
			totalItemsSize += horizontal ? el.clientWidth : el.clientHeight;
		});

		// Calculate flex grow values of all items rendered by css originally
		sortedItems.forEach(([el], i) => {
			const itemSizePercent = (horizontal ? el.clientWidth : el.clientHeight) / totalItemsSize;
			growValues[i] = sortedItems.length * itemSizePercent * 100;
		});

		// Apply flex grow after calculation is done to avoid layout shifts during the calculation
		sortedItems.forEach(([el], i) => {
			if (!growValues[i]) return;
			el.style.flexGrow = growValues[i].toString();
			el.setAttribute("data-rs-resizable-item-mounted", "");
		});
	}, [horizontal, getSortedItems]);

	const contextValue = React.useMemo<T.Context>(
		() => ({ containerRef, direction, registerItem, onDrag }),
		[direction, registerItem, onDrag]
	);

	return (
		<ResizableContext.Provider value={contextValue}>
			<View
				attributes={{ ...attributes, ref: containerRef }}
				className={rootClassNames}
				height={height}
				direction={direction}
				align="stretch"
				gap={gap}
			>
				{children}
			</View>
		</ResizableContext.Provider>
	);
};

Resizable.displayName = "Resizable";

export default Resizable;
