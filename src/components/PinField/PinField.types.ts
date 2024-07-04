import type * as G from "types/global";

export type Size = "medium" | "large" | "xlarge";

type BaseProps = {
	name: string;
	valueLength?: number;
	pattern?: "alphabetic" | "numeric" | "alphanumeric";
	size?: G.Responsive<Size>;
	variant?: "outline" | "faded";
	onChange?: G.ChangeHandler<string>;
	inputAttributes?: G.Attributes<"input">;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };

export type Props = ControlledProps | UncontrolledProps;
