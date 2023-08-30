import { ReshapedConfig } from "types/config";

type Primitive = string | number | boolean;
export type PartialDeep<T> = T extends Primitive
	? Partial<T>
	: { [Key in keyof T]?: PartialDeep<T[Key]> };

export type PublicOptions = {
	isPrivate?: boolean;
	themeOptions?: ReshapedConfig["themeOptions"];
};

export type PrivateOptions = PublicOptions & { isFragment?: boolean };
export type CLIOptions = PrivateOptions & { outputPath: string };
