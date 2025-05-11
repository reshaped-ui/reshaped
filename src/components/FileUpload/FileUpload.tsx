"use client";

import React from "react";
import { classNames } from "utilities/props";
import View from "components/View";
import HiddenVisually from "components/HiddenVisually";
import useToggle from "hooks/useToggle";
import type * as T from "./FileUpload.types";
import s from "./FileUpload.module.css";

const FileUploadTrigger: React.FC<T.TriggerProps> = (props) => {
	const { children } = props;

	return <span className={s.trigger}>{children}</span>;
};

const FileUpload: React.FC<T.Props> & {
	Trigger: typeof FileUploadTrigger;
} = (props) => {
	const { name, children, height, className, attributes, inputAttributes, onChange } = props;
	const highlightToggle = useToggle();
	const rootClassNames = classNames(
		s.root,
		highlightToggle.active && s["--highlighted"],
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

	return (
		<View
			className={rootClassNames}
			height={height}
			attributes={{
				...attributes,
				onDragOver: handleDragOver,
				onDragEnter: handleDragEnter,
				onDragLeave: handleDragLeave,
				onDrop: handleDrop,
			}}
		>
			<View
				as="label"
				className={s.triggerLayer}
				padding={6}
				borderRadius="medium"
				gap={2}
				align="center"
				justify="center"
				textAlign="center"
				animated
				height="100%"
			>
				<View.Item>{children}</View.Item>
				<HiddenVisually>
					<input
						{...inputAttributes}
						type="file"
						className={s.field}
						name={name}
						onChange={handleChange}
					/>
				</HiddenVisually>
			</View>
		</View>
	);
};

FileUpload.Trigger = FileUploadTrigger;

FileUpload.displayName = "FileUpload";
FileUploadTrigger.displayName = "FileUpload.Trigger";

export default FileUpload;
