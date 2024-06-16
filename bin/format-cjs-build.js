#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

/**
 * Culori is a ESM only package by default but provides a separate bundled output with require
 * We're replacing the import path for the node environment
 */

const distPath = path.resolve(__dirname, "../dist/");
const distThemesPath = path.resolve(distPath, "themes");
const distCjsThemesPath = path.resolve(distPath, "cjs/themes");
const culoriFilePath = path.resolve(distCjsThemesPath, "_generator/utilities/generateColors.js");

const content = fs.readFileSync(culoriFilePath, "utf-8");
const updatedContent = content.replace("culori/fn", "culori/require");

fs.writeFileSync(culoriFilePath, updatedContent, "utf-8");

console.log("Updated culori imports for the CJS build");

function copyCssFiles(src, dest) {
	const items = fs.readdirSync(src, { withFileTypes: true });

	for (const item of items) {
		const srcPath = path.join(src, item.name);
		const destPath = path.join(dest, item.name);

		if (item.isDirectory()) {
			copyCssFiles(srcPath, destPath);
		} else if (path.extname(item.name) === ".css") {
			if (!fs.existsSync(destPath)) fs.mkdirSync(dest, { recursive: true });
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

copyCssFiles(distThemesPath, distCjsThemesPath);

console.log("Copied CSS files for the CJS build");
