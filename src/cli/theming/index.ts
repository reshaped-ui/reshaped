import fs from "fs";
import path from "path";
import chalk from "chalk";
import type {
	PartialUserThemeDefinition,
	FullThemeDefinition,
} from "themes/_generator/tokens/types";
import type * as T from "themes/_generator/types";
import mergeDefinitions from "themes/_generator/utilities/mergeDefinitions";
import transform from "themes/_generator/transform";
import reshapedDefinition from "./definitions/reshaped";
import baseDefinition from "./definitions/base";

const transformDefinition = (
	name: string,
	definition: T.PartialDeep<FullThemeDefinition>,
	options: T.CLIOptions
) => {
	const { isFragment, outputPath } = options;
	const code = transform(name, definition, options);

	const themeFolderPath = isFragment
		? path.resolve(outputPath, "fragments", name)
		: path.resolve(outputPath, name);
	const themePath = path.resolve(themeFolderPath, "theme.css");

	fs.mkdirSync(themeFolderPath, { recursive: true });
	fs.writeFileSync(themePath, code.variables);

	if (code.media) {
		const mediaPath = path.resolve(outputPath, "media.css");
		fs.writeFileSync(mediaPath, code.media);
	}

	const logOutput = `Compiled ${chalk.bold(name)} theme${isFragment ? " fragment" : ""}`;

	// eslint-disable-next-line no-console
	console.log(chalk.green(logOutput));
};

export const addThemeFragment = (
	name: string,
	definition: PartialUserThemeDefinition,
	options: T.CLIOptions
) => {
	transformDefinition(name, definition, { ...options, isFragment: true });
};

export const addTheme = (
	name: string,
	definition: PartialUserThemeDefinition,
	options: T.CLIOptions
) => {
	const withReshaped = mergeDefinitions(reshapedDefinition, definition);
	const withBase = mergeDefinitions(withReshaped, baseDefinition);
	transformDefinition(name, withBase, options);
};
