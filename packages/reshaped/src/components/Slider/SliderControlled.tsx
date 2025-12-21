"use client";

import React from "react";

import { useFormControl } from "components/FormControl";
import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import useRTL from "hooks/useRTL";
import { triggerChangeEvent } from "utilities/dom";
import { classNames } from "utilities/props";
import { disableScroll, enableScroll } from "utilities/scroll";

import s from "./Slider.module.css";
import { applyStepToValue, getDragCoord } from "./Slider.utilities";
import SliderThumb from "./SliderThumb";

import type * as T from "./Slider.types";

const THUMB_SIZE = 16;

const SliderControlled: React.FC<T.ControlledProps & T.DefaultProps> = (props) => {
	const {
		name,
		range,
		max,
		min,
		step = 1,
		onChange,
		onChangeCommit,
		renderValue,
		className,
		attributes,
		orientation = "horizontal",
	} = props;
	const onChangeRef = useHandlerRef(onChange);
	const onChangeCommitRef = useHandlerRef(onChangeCommit);
	const vertical = orientation === "vertical";
	const minValue =
		range && props.minValue !== undefined ? applyStepToValue(props.minValue, step) : undefined;
	const maxValue = applyStepToValue(range ? props.maxValue : props.value, step);
	const minName = props.minName ?? props.name;
	const maxName = props.maxName ?? props.name;
	const barRef = React.useRef<HTMLDivElement>(null);
	const minRef = React.useRef<HTMLDivElement>(null);
	const maxRef = React.useRef<HTMLDivElement>(null);
	const minTooltipRef = React.useRef<HTMLDivElement>(null);
	const maxTooltipRef = React.useRef<HTMLDivElement>(null);
	const minInputRef = React.useRef<HTMLInputElement>(null);
	const maxInputRef = React.useRef<HTMLInputElement>(null);
	const [draggingId, setDraggingId] = React.useState<string | null>(null);
	const [rtl] = useRTL();
	const formControl = useFormControl();
	const id = useElementId();
	const inputId = formControl?.attributes?.id || id;
	const minId = `${inputId}-min`;
	const maxId = `${inputId}-max`;
	const disabled = formControl?.disabled || props.disabled;
	const rootClassNames = classNames(
		s.root,
		disabled && s["--disabled"],
		orientation && s[`--orientation-${orientation}`],
		className
	);

	const getPositionValue = React.useCallback(
		(dragCoord: number) => {
			const barEl = barRef.current;

			if (!barEl) return;

			const barSize = vertical ? barEl.clientHeight : barEl.clientWidth;
			const barRect = barEl.getBoundingClientRect();
			// Move by half thumb size since it's a reserved space
			const barCoord = barRect[vertical ? "top" : "left"] + THUMB_SIZE / 2;
			const position = dragCoord - barCoord;
			const thumbsAreaWidth = barSize - THUMB_SIZE;

			let percentage = position / thumbsAreaWidth;
			if (rtl || vertical) percentage = 1 - percentage;

			let value = (max - min) * percentage + min;
			value = Math.max(min, Math.min(max, value));

			return applyStepToValue(value, step);
		},
		[max, min, rtl, step, vertical]
	);

	const getPercentPosition = (value: number) => {
		const ratio = (value - min) / (max - min);

		return ratio * 100;
	};

	const positionTooltip = React.useCallback(
		(draggingId: string) => {
			if (vertical) return;

			const draggingRef = draggingId === minId ? minTooltipRef : maxTooltipRef;
			const thumbRef = draggingId === minId ? minRef : maxRef;

			let nextTooltipOffset = 0;
			const barRect = barRef.current?.getBoundingClientRect();
			const draggingRect = draggingRef.current?.getBoundingClientRect();
			const thumbRect = thumbRef.current?.getBoundingClientRect();

			const barLeftSide = barRect?.left;
			const barRightSide = barLeftSide && barLeftSide + barRect?.width;
			const tooltipLeftSide = thumbRect && draggingRect && thumbRect.left - draggingRect.width / 2;
			const tooltipRightSide = thumbRect && draggingRect && thumbRect.left + draggingRect.width / 2;

			// Crosses the left slider boundary
			if (tooltipLeftSide && barLeftSide && tooltipLeftSide < barLeftSide) {
				nextTooltipOffset = draggingRect.width / 2 - 8;
			}

			// Crosses the right slider boundary
			if (tooltipRightSide && barRightSide && tooltipRightSide > barRightSide) {
				nextTooltipOffset = -(draggingRect.width / 2 - 8);
			}

			const tooltipEl = draggingRef.current;
			if (tooltipEl) {
				tooltipEl.style.setProperty("--rs-slider-tooltip-offset", `${nextTooltipOffset || 0}px`);
			}
		},
		[minId, vertical]
	);

	const handleMinChange: T.ThumbProps["onChange"] = React.useCallback(
		(value, options = {}) => {
			if (!range) return;

			const args = { minValue: value, maxValue, name, minName, maxName };

			// Manually controlled resolving of single/range handlers
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (options.commit) onChangeCommitRef.current?.(args);

			// Manually controlled resolving of single/range handlers
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (options.native) onChangeRef.current?.(args);

			triggerChangeEvent(minInputRef.current!, value.toString());
		},
		[maxValue, name, minName, maxName, range, onChangeCommitRef, onChangeRef]
	);

	const handleMaxChange: T.ThumbProps["onChange"] = React.useCallback(
		(value, options = {}) => {
			const args = range
				? { minValue: minValue!, maxValue: value, name, minName, maxName }
				: { value, name };

			// Manually controlled resolving of single/range handlers
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (options.commit) onChangeCommitRef.current?.(args);

			// Manually controlled resolving of single/range handlers
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (options.native) onChangeRef.current?.(args);

			triggerChangeEvent(maxInputRef.current!, value.toString());
		},
		[minValue, name, minName, maxName, range, onChangeRef, onChangeCommitRef]
	);

	const handleMouseDown = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
		if (disabled) return;

		let minDistance: number;
		let closestId;
		const dragCoord = getDragCoord({ event: nativeEvent, vertical });
		const nextValue = getPositionValue(dragCoord);
		const thumbs = [
			{ ref: minRef, id: minId },
			{ ref: maxRef, id: maxId },
		];

		thumbs.forEach((item) => {
			if (!item.ref.current) return;
			const el = item.ref.current;
			const elRect = el.getBoundingClientRect();
			const distance = Math.abs((vertical ? elRect.top : elRect.left) - dragCoord);

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

	const handleMinDragStart: T.ThumbProps["onDragStart"] = (e) => {
		if (disabled) return;

		e.stopPropagation();
		disableScroll();
		setDraggingId(minId);
	};

	const handleMaxDragStart: T.ThumbProps["onDragStart"] = (e) => {
		if (disabled) return;

		e.stopPropagation();
		disableScroll();
		setDraggingId(maxId);
	};

	const handleDragStop = React.useCallback(() => {
		if (draggingId === minId && minValue !== undefined) {
			handleMinChange(minValue, { commit: true });
			minInputRef.current?.focus();
		}

		if (draggingId === maxId) {
			handleMaxChange(maxValue, { commit: true });
			maxInputRef.current?.focus();
		}

		enableScroll();
		setDraggingId(null);
	}, [minValue, maxValue, handleMinChange, handleMaxChange, draggingId, minId, maxId]);

	const handleDrag = React.useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (!draggingId) return;

			const coord = getDragCoord({ event: e, vertical });
			const nextValue = getPositionValue(coord);

			if (nextValue === undefined) return;

			// Switch to another id if thumbs overlap
			let nextDraggingId = draggingId;

			if (draggingId === minId && nextValue > maxValue) nextDraggingId = maxId;
			if (draggingId === maxId && minValue && nextValue < minValue) nextDraggingId = minId;

			if (nextDraggingId === minId) handleMinChange(nextValue);
			if (nextDraggingId === maxId) handleMaxChange(nextValue);
			if (draggingId !== nextDraggingId) setDraggingId(nextDraggingId);
		},
		[
			draggingId,
			minValue,
			maxValue,
			getPositionValue,
			handleMaxChange,
			handleMinChange,
			maxId,
			minId,
			vertical,
		]
	);

	React.useEffect(() => {
		positionTooltip(minId);
		positionTooltip(maxId);
	}, [minId, maxId, minValue, maxValue, positionTooltip]);

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
					style={
						{
							"--rs-slider-selection-start": `${minPercentPosition || 0}%`,
							"--rs-slider-selection-size": `${maxPercentPosition - (minPercentPosition || 0)}%`,
						} as React.CSSProperties
					}
				/>
			</div>

			<div className={s.thumbs}>
				{minValue !== undefined && minPercentPosition !== undefined && (
					<SliderThumb
						id={minId}
						active={minId === draggingId}
						name={minName}
						disabled={disabled}
						onChange={handleMinChange}
						value={minValue}
						onDragStart={handleMinDragStart}
						position={minPercentPosition}
						max={max}
						min={min}
						ref={minRef}
						tooltipRef={minTooltipRef}
						inputRef={minInputRef}
						renderValue={renderValue}
						step={step}
						orientation={orientation}
					/>
				)}

				<SliderThumb
					id={maxId}
					active={maxId === draggingId}
					name={maxName}
					disabled={disabled}
					onChange={handleMaxChange}
					value={maxValue}
					onDragStart={handleMaxDragStart}
					position={maxPercentPosition}
					max={max}
					min={min}
					ref={maxRef}
					tooltipRef={maxTooltipRef}
					inputRef={maxInputRef}
					renderValue={renderValue}
					step={step}
					orientation={orientation}
				/>
			</div>
		</div>
	);
};

SliderControlled.displayName = "SliderControlled";

export default SliderControlled;
