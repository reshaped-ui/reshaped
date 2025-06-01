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

function replaceInFile(filePath, searchValue, replaceValue) {
	const content = fs.readFileSync(filePath, "utf-8");
	if (content.includes(searchValue)) {
		const updatedContent = content.replaceAll(searchValue, replaceValue);
		fs.writeFileSync(filePath, updatedContent, "utf-8");
		console.log(`Updated culori import in ${filePath}`);
	}
}

function processDirectory(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			processDirectory(fullPath);
		} else if (entry.isFile() && fullPath.endsWith(".js")) {
			replaceInFile(fullPath, "culori/fn", "culori/require");
		}
	}
}

processDirectory(distCjsThemesPath);

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
