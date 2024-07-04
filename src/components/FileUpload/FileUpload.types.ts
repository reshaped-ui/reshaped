import type React from "react";
import type * as G from "types/global";

export type Props = {
	name: string;
	children?: React.ReactNode;
	onChange?: G.ChangeHandler<
		File[],
		React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
	>;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
	inputAttributes?: G.Attributes<"input">;
};

export type TriggerProps = {
	children: React.ReactNode;
};
