"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useRTL from "hooks/useRTL";
import SliderThumb from "./SliderThumb";
import type * as T from "./Slider.types";
import s from "./Slider.module.css";

const minId = "min";
const maxId = "max";

const getDragX = (event: MouseEvent | TouchEvent) => {
	if (event instanceof MouseEvent) return event.pageX || event.screenX;
	return event.changedTouches[0].pageX;
};

const applyStepToValue = (value: number, step: number) => {
	return Math.round(value / step) * step;
};

const SliderControlled = (props: T.ControlledProps & T.DefaultProps) => {
	const {
		name,
		range,
		max,
		min,
		disabled,
		step = 1,
		onChange,
		onChangeCommit,
		renderValue,
		className,
		attributes,
	} = props;
	const minValue =
		range && props.minValue !== undefined ? applyStepToValue(props.minValue, step) : undefined;
	const maxValue = applyStepToValue(range ? props.maxValue : props.value, step);
	const barRef = React.useRef<HTMLDivElement | null>(null);
	const minRef = React.useRef<HTMLDivElement | null>(null);
	const maxRef = React.useRef<HTMLDivElement | null>(null);
	const [draggingId, setDraggingId] = React.useState<"min" | "max" | null>(null);
	const [rtl] = useRTL();
	const rootClassNames = classNames(s.root, disabled && s["--disabled"], className);

	const getPositionValue = React.useCallback(
		(x: number) => {
			if (!barRef.current) return;

			const barWidth = barRef.current.clientWidth;
			const positionX = x - barRef.current!.getBoundingClientRect().left;

			let percentage = positionX / barWidth;
			if (rtl) percentage = 1 - percentage;

			let value = (max - min) * percentage + min;
			value = Math.max(min, Math.min(max, value));

			return applyStepToValue(value, step);
		},
		[max, min, rtl, step]
	);

	const getPercentPosition = (value: number) => {
		const ratio = (value - min) / (max - min);

		return ratio * 100;
	};

	const handleMinChange: T.ThumbProps["onChange"] = React.useCallback(
		(value, options) => {
			if (!range) return;
			const method = options?.commit ? onChangeCommit : onChange;

			method?.({ minValue: value, maxValue, name });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[maxValue, name, range]
	);

	const handleMaxChange: T.ThumbProps["onChange"] = React.useCallback(
		(value, options) => {
			if (range) {
				const method = options?.commit ? onChangeCommit : onChange;
				method?.({ minValue: minValue!, maxValue: value, name });
				return;
			}

			const method = options?.commit ? onChangeCommit : onChange;
			method?.({ value, name });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[minValue, name, range]
	);

	const handleMouseDown = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
		if (disabled) return;

		let minDistance: number;
		let closestId;
		const x = getDragX(nativeEvent);
		const nextValue = getPositionValue(x);
		const thumbs = [
			{ ref: minRef, id: minId },
			{ ref: maxRef, id: maxId },
		];

		thumbs.forEach((item) => {
			if (!item.ref.current) return;
			const el = item.ref.current;
			const distance = Math.abs(el.getBoundingClientRect().left - x);

			if (minDistance === undefined || distance <= minDistance) {
				minDistance = distance;
				closestId = item.id;
			}
		});

		if (!closestId || nextValue === undefined) return;
		if (closestId === minId) handleMinChange(nextValue);
		if (closestId === maxId) handleMaxChange(nextValue);

		setDraggingId(closestId);
	};

	const handleMinDragStart = () => {
		if (disabled) return;
		setDraggingId(minId);
	};

	const handleMaxDragStart = () => {
		if (disabled) return;
		setDraggingId(maxId);
	};

	const handleDragStop = React.useCallback(() => {
		if (draggingId === minId && minValue !== undefined) {
			handleMinChange(minValue, { commit: true });
		}

		if (draggingId === maxId) {
			handleMaxChange(maxValue, { commit: true });
		}

		setDraggingId(null);
	}, [minValue, maxValue, handleMinChange, handleMaxChange, draggingId]);

	const handleDrag = React.useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (!draggingId) return;

			const x = getDragX(e);
			const nextValue = getPositionValue(x);

			if (nextValue === undefined) return;

			// Switch to another id if thumbs overlap
			let nextDraggingId = draggingId;

			if (draggingId === minId && nextValue > maxValue) nextDraggingId = maxId;
			if (draggingId === maxId && minValue && nextValue < minValue) nextDraggingId = minId;

			if (nextDraggingId === minId) handleMinChange(nextValue);
			if (nextDraggingId === maxId) handleMaxChange(nextValue);
			if (draggingId !== nextDraggingId) setDraggingId(nextDraggingId);
		},
		[draggingId, minValue, maxValue, getPositionValue, handleMaxChange, handleMinChange]
	);

	React.useEffect(() => {
		window.addEventListener("mouseup", handleDragStop);
		window.addEventListener("touchend", handleDragStop);
		window.addEventListener("mousemove", handleDrag);
		window.addEventListener("touchmove", handleDrag);

		return () => {
			window.removeEventListener("mouseup", handleDragStop);
			window.removeEventListener("touchend", handleDragStop);
			window.removeEventListener("mousemove", handleDrag);
			window.removeEventListener("touchmove", handleDrag);
		};
	}, [handleDragStop, handleDrag]);

	const minPercentPosition = minValue && getPercentPosition(minValue);
	const maxPercentPosition = getPercentPosition(maxValue);

	return (
		// mouse/touch events only needed for non-keyboard use
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			{...attributes}
			className={rootClassNames}
			onMouseDown={handleMouseDown}
			onTouchStart={handleMouseDown}
		>
			<div className={s.bar} ref={barRef}>
				<div
					className={s.selection}
					style={{
						insetInlineStart: `${minPercentPosition || 0}%`,
						width: `${maxPercentPosition - (minPercentPosition || 0)}%`,
					}}
				/>
			</div>

			{minValue !== undefined && minPercentPosition !== undefined && (
				<SliderThumb
					id={minId}
					active={minId === draggingId}
					name={name}
					disabled={disabled}
					onChange={handleMinChange}
					value={minValue}
					onDragStart={handleMinDragStart}
					position={minPercentPosition}
					max={max}
					min={min}
					ref={minRef}
					renderValue={renderValue}
				/>
			)}

			<SliderThumb
				id={maxId}
				active={maxId === draggingId}
				name={name}
				disabled={disabled}
				onChange={handleMaxChange}
				value={maxValue}
				onDragStart={handleMaxDragStart}
				position={maxPercentPosition}
				max={max}
				min={min}
				ref={maxRef}
				renderValue={renderValue}
			/>
		</div>
	);
};

export default SliderControlled;
