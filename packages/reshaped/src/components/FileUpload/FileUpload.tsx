"use client";

import React from "react";

import HiddenVisually from "components/HiddenVisually";
import View from "components/View";
import useToggle from "hooks/useToggle";
import { classNames } from "utilities/props";

import s from "./FileUpload.module.css";

import type * as T from "./FileUpload.types";

export const FileUploadTrigger: React.FC<T.TriggerProps> = (props) => {
	const { children } = props;

	return <span className={s.trigger}>{children}</span>;
};

const FileUpload: React.FC<T.Props> = (props) => {
	const {
		name,
		children,
		height,
		variant = "outline",
		inline,
		className,
		disabled,
		attributes,
		inputAttributes,
		onChange,
	} = props;
	const highlightToggle = useToggle();
	const rootClassNames = classNames(
		s.root,
		variant && s[`--variant-${variant}`],
		inline && s[`--inline`],
		highlightToggle.active && s["--highlighted"],
		disabled && s["--disabled"],
		className
	);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		attributes?.onDragOver?.(event);
	};

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		highlightToggle.activate();
		attributes?.onDragEnter?.(event);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		// Ignore elements inside the field
		if (event.currentTarget.contains(event.relatedTarget as Node)) return;
		highlightToggle.deactivate();
		attributes?.onDragLeave?.(event);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		highlightToggle.deactivate();

		onChange?.({ name, value: Array.from(event.dataTransfer.files), event });
		attributes?.onDrop?.(event);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.files;
		if (!nextValue) return;

		onChange?.({ name, event, value: Array.from(nextValue) });
		inputAttributes?.onChange?.(event);
	};

	const inputNode = (
		<HiddenVisually>
			<input
				{...inputAttributes}
				type="file"
				className={s.field}
				name={name}
				disabled={disabled}
				onChange={handleChange}
			/>
		</HiddenVisually>
	);

	const childrenNode =
		typeof children === "function" ? children({ highlighted: highlightToggle.active }) : children;

	return (
		<View
			className={rootClassNames}
			height={height}
			// For the focus ring radius
			borderRadius="medium"
			attributes={{
				...attributes,
				onDragOver: handleDragOver,
				onDragEnter: handleDragEnter,
				onDragLeave: handleDragLeave,
				onDrop: handleDrop,
			}}
		>
			{variant === "outline" && !inline ? (
				<View
					as="label"
					className={s.triggerLayer}
					padding={6}
					borderRadius="medium"
					gap={2}
					align="center"
					justify="center"
					textAlign="center"
					height="100%"
				>
					{inputNode}
					<View.Item>{childrenNode}</View.Item>
				</View>
			) : (
				<label className={s.triggerLayer}>
					{inputNode}
					{childrenNode}
				</label>
			)}
		</View>
	);
};

FileUpload.displayName = "FileUpload";
FileUploadTrigger.displayName = "FileUpload.Trigger";

export default FileUpload;
