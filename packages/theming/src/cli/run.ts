import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import chalk from "chalk";
import { Command } from "commander";

import defaultConfig from "./reshaped.config";
import { addTheme, addThemeFragment } from "./index";

const program = new Command();

const importJSConfig = (configPath: string) => {
	console.log(chalk.yellow(`Using Reshaped config at ${configPath}`));

	const config = require(configPath);
	return config.default || config;
};

program
	.description("Create new themes for Reshaped")
	.command("theming")
	.requiredOption("-o, --output <path>", "Path to output generated themes")
	.option("-c, --config <path>", "Path to the config file")
	.action(async (opts) => {
		const { output: outputPath, config: passedConfigPath } = opts;
		const originPath = process.cwd();
		let config;

		const cjsConfigPath = path.resolve(originPath, "reshaped.config.cjs");
		const jsConfigPath = path.resolve(originPath, "reshaped.config.js");
		const tsConfigPath = path.resolve(originPath, "reshaped.config.ts");

		if (passedConfigPath) {
			const attemptPath = path.resolve(originPath, passedConfigPath);
			if (fs.existsSync(attemptPath)) config = importJSConfig(attemptPath);
		}

		[jsConfigPath, cjsConfigPath, tsConfigPath].forEach((p) => {
			if (!passedConfigPath && fs.existsSync(p)) config = importJSConfig(p);
		});

		if (!config) config = defaultConfig;

		console.log(chalk.blue("Processing Reshaped themes..."));
		const { themes, themeFragments, themeOptions } = config;

		if (themes) {
			Object.keys(themes).forEach((themeName) => {
				addTheme(themeName, themes[themeName], { outputPath, themeOptions });
			});
		}

		if (themeFragments) {
			Object.keys(themeFragments).forEach((fragmentName) => {
				addThemeFragment(fragmentName, themeFragments[fragmentName], {
					outputPath,
					themeOptions,
				});
			});
		}
	});

program.parse(process.argv);
