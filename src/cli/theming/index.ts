import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import reshapedDefinition from "themes/_generator/definitions/reshaped";
import transform from "themes/_generator/transform";
import mergeDefinitions from "themes/_generator/utilities/mergeDefinitions";

import { transformToTailwind } from "./tailwind";

import type { PassedThemeDefinition } from "themes/_generator/tokens/types";
import type * as T from "themes/_generator/types";

const transformDefinition = (
	name: string,
	definition: PassedThemeDefinition,
	options: T.CLIOptions
) => {
	const { isFragment, outputPath } = options;
	const code = transform(name, definition, options);

	const themeFolderPath = isFragment
		? path.resolve(outputPath, "fragments", name)
		: path.resolve(outputPath, name);

	const themePath = path.resolve(themeFolderPath, "theme.css");
	const themeMediaPath = path.resolve(themeFolderPath, "media.css");
	const twPath = path.resolve(themeFolderPath, "tailwind.css");
	const themeJsonPath = path.resolve(themeFolderPath, "theme.json");

	fs.mkdirSync(themeFolderPath, { recursive: true });
	fs.writeFileSync(themePath, code.variables);
	fs.writeFileSync(themeJsonPath, JSON.stringify(code.theme, null, 2));
	fs.writeFileSync(twPath, transformToTailwind(code.theme));

	if (code.media) fs.writeFileSync(themeMediaPath, code.media);

	const logOutput = `Compiled ${chalk.bold(name)} theme${isFragment ? " fragment" : ""}`;

	console.log(chalk.green(logOutput));
};

export const addThemeFragment = (
	name: string,
	definition: PassedThemeDefinition,
	options: T.CLIOptions
) => {
	transformDefinition(name, definition, { ...options, isFragment: true });
};

export const addTheme = (
	name: string,
	definition: PassedThemeDefinition,
	options: T.CLIOptions
) => {
	transformDefinition(name, mergeDefinitions(reshapedDefinition, definition), options);
};
