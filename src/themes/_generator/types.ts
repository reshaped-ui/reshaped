import type { ReshapedConfig } from "types/config";

export type PartialDeep<T> = {
	[K in keyof T]?: {
		[K2 in keyof T[K]]?: T[K][K2];
	};
};

export type PublicOptions = {
	themeOptions?: ReshapedConfig["themeOptions"];
};

export type PrivateOptions = PublicOptions & { isFragment?: boolean };
export type CLIOptions = PrivateOptions & { outputPath: string };
