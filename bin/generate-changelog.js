#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Generate changelog using conventional-changelog-cli
 * This script generates changelog entries based on conventional commits
 * since the last release tag.
 */

const CHANGELOG_FILE = "CHANGELOG.md";

function getLatestTag() {
	try {
		const latestTag = execSync("git describe --tags --abbrev=0", {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"],
		}).trim();
		console.log(`Latest tag found: ${latestTag}`);
		return latestTag;
	} catch (error) {
		console.log("No tags found, generating changelog from the beginning");
		return null;
	}
}

function getSpecificTag(version) {
	// Ensure version starts with 'v' for git tag format
	const tag = version.startsWith("v") ? version : `v${version}`;

	try {
		// Check if the tag exists
		execSync(`git rev-parse --verify ${tag}`, {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"],
		});
		console.log(`Specific tag found: ${tag}`);
		return tag;
	} catch (error) {
		console.error(`❌ Tag ${tag} not found in git history`);
		process.exit(1);
	}
}

function getPreviousTag(currentTag) {
	try {
		// Get all tags sorted by version, find the one before currentTag
		const allTags = execSync("git tag --sort=-version:refname", {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"],
		})
			.trim()
			.split("\n")
			.filter((tag) => tag.trim());

		const currentIndex = allTags.indexOf(currentTag);
		if (currentIndex === -1) {
			console.error(`❌ Current tag ${currentTag} not found in tag list`);
			process.exit(1);
		}

		if (currentIndex === allTags.length - 1) {
			console.log("No previous tag found, will generate from beginning");
			return null;
		}

		const previousTag = allTags[currentIndex + 1];
		console.log(`Previous tag found: ${previousTag}`);
		return previousTag;
	} catch (error) {
		console.log("Could not find previous tag, will generate from beginning");
		return null;
	}
}

function getCurrentVersion() {
	const packagePath = path.join(process.cwd(), "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
	return packageJson.version;
}

function hasCommitsSinceTag(tag) {
	if (!tag) return true;

	try {
		const commitCount = execSync(`git rev-list --count ${tag}..HEAD`, {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"],
		}).trim();

		return parseInt(commitCount) > 0;
	} catch (error) {
		return true;
	}
}

function generateChangelog(fromTag = null, toTag = null) {
	const currentVersion = getCurrentVersion();

	if (fromTag && toTag) {
		console.log(`Generating changelog for commits between ${fromTag} and ${toTag}...`);
	} else if (fromTag) {
		console.log(`Generating changelog for commits since ${fromTag}...`);
	} else {
		console.log(`Generating changelog for version ${currentVersion}...`);
	}

	try {
		let command;

		if (fromTag && toTag) {
			// For specific version ranges, we need to generate from that specific tag
			// First, check if there are commits in the range
			const testCommits = execSync(`git log --oneline ${fromTag}..${toTag}`, {
				encoding: "utf8",
				stdio: ["pipe", "pipe", "pipe"],
			}).trim();

			if (!testCommits) {
				console.log(`No commits found between ${fromTag} and ${toTag}`);
				return "";
			}

			console.log(`Found ${testCommits.split("\n").length} commits in range`);

			// Generate changelog from the specific tag to the target tag
			// We'll use a different approach: generate all and extract the specific version
			command = `npx conventional-changelog -p angular -r 0`;

			const fullChangelog = execSync(command, {
				encoding: "utf8",
				stdio: ["pipe", "pipe", "pipe"],
			});

			// Extract the specific version section from the full changelog
			return extractVersionFromChangelog(fullChangelog, toTag);
		} else {
			command = "npx conventional-changelog -p angular -r 0";
		}

		// Set the git range environment variable for unreleased changes
		const env = { ...process.env };
		if (fromTag) {
			env.CONVENTIONAL_CHANGELOG_GIT_RANGE = `${fromTag}..HEAD`;
		}

		const changelog = execSync(command, {
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"],
			env: env,
		});

		return changelog;
	} catch (error) {
		console.error("Error generating changelog:", error.message);
		console.error("Command output:", error.stdout?.toString());
		console.error("Command error:", error.stderr?.toString());
		process.exit(1);
	}
}

function extractVersionFromChangelog(fullChangelog, targetTag) {
	// Remove 'v' prefix if present
	const version = targetTag.replace(/^v/, "");

	const lines = fullChangelog.split("\n");
	let startIndex = -1;
	let endIndex = -1;

	// Look for the version header
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Match version headers like "# [3.7.3]", "## [3.7.3]", or "# 3.7.3"
		if (line.match(new RegExp(`^#+\\s*\\[?${version.replace(/\./g, "\\.")}\\]?`))) {
			startIndex = i;
			break;
		}
	}

	if (startIndex === -1) {
		console.log(`Version ${version} not found in generated changelog`);
		return "";
	}

	// Find the end of this version section (next version header or end of file)
	for (let i = startIndex + 1; i < lines.length; i++) {
		const line = lines[i];

		// Look for next version header
		if (line.match(/^#+\s*\[?\d+\.\d+\.\d+/)) {
			endIndex = i;
			break;
		}
	}

	// If no end found, take until end of file
	if (endIndex === -1) {
		endIndex = lines.length;
	}

	return lines.slice(startIndex, endIndex).join("\n").trim();
}

function extractUnreleasedFromChangelog(fullChangelog) {
	const lines = fullChangelog.split("\n");
	let endIndex = -1;

	// Find the first version header (this marks the end of unreleased content)
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Look for version headers like "# [3.7.3]", "## [3.7.3]", "# 3.7.3", etc.
		if (line.match(/^#+\s*\[?\d+\.\d+\.\d+/)) {
			endIndex = i;
			break;
		}
	}

	// If no version header found, return the entire changelog (all unreleased)
	if (endIndex === -1) {
		return fullChangelog.trim();
	}

	// Return everything before the first version header
	return lines.slice(0, endIndex).join("\n").trim();
}

function updateChangelogFile(newContent, specificVersion = null) {
	const changelogPath = path.join(process.cwd(), CHANGELOG_FILE);
	const currentVersion = specificVersion || getCurrentVersion();

	if (!newContent || newContent.trim() === "") {
		console.log("⚠️  No changelog content generated");
		return;
	}

	if (fs.existsSync(changelogPath)) {
		const existingContent = fs.readFileSync(changelogPath, "utf8");

		// Check if this version already exists in the changelog
		if (
			existingContent.includes(`## ${currentVersion}`) ||
			existingContent.includes(`## [${currentVersion}]`)
		) {
			console.log(`ℹ️  Version ${currentVersion} already exists in changelog. Skipping update.`);
			return;
		}

		// Parse the generated changelog to extract just the new version section
		const lines = newContent.split("\n");
		let versionContent = [];
		let inVersionSection = false;
		let versionHeader = "";

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Look for version headers like "## [1.0.0]" or "# [1.0.0]"
			if (line.match(/^#+\s*\[?\d+\.\d+\.\d+/)) {
				if (!inVersionSection) {
					inVersionSection = true;
					// Convert to simple format
					versionHeader = line.replace(/^#+\s*\[?(\d+\.\d+\.\d+)\]?.*$/, `## $1`);
				} else {
					// Found next version, stop here
					break;
				}
			} else if (inVersionSection) {
				versionContent.push(line);
			}
		}

		// Remove trailing empty lines
		while (versionContent.length > 0 && versionContent[versionContent.length - 1].trim() === "") {
			versionContent.pop();
		}

		if (versionContent.length > 0) {
			// Use current version from package.json instead of generated version
			const newVersionSection = `## ${currentVersion}\n${versionContent.join("\n")}\n\n`;

			// Add the new section at the top of existing changelog
			const updatedContent = newVersionSection + existingContent;
			fs.writeFileSync(changelogPath, updatedContent, "utf8");
			console.log(
				`✅ Updated ${CHANGELOG_FILE} with new changelog entries for version ${currentVersion}`
			);
		} else {
			console.log("⚠️  No changelog content found for new commits");
		}
	} else {
		// Create new changelog file
		let cleanContent = newContent.replace(
			/^#+\s*\[?(\d+\.\d+\.\d+)\]?.*$/gm,
			`## ${currentVersion}`
		);
		fs.writeFileSync(changelogPath, cleanContent, "utf8");
		console.log(`✅ Created new ${CHANGELOG_FILE}`);
	}
}

function main() {
	console.log("🔄 Generating changelog...");

	const args = process.argv.slice(2);
	const unreleasedOnly = args.includes("--unreleased") || args.includes("-u");
	const dryRun = args.includes("--dry") || args.includes("-d");

	// Check for version argument (not a flag)
	const versionArg = args.find((arg) => !arg.startsWith("--") && !arg.startsWith("-"));

	if (versionArg) {
		// Generate changelog for specific version range
		console.log(`📋 Generating changelog for version ${versionArg}...`);

		const targetTag = getSpecificTag(versionArg);
		const previousTag = getPreviousTag(targetTag);

		console.log(
			`📝 Generating changelog between ${previousTag || "beginning"} and ${targetTag}...`
		);

		const newChangelog = generateChangelog(previousTag, targetTag);

		if (newChangelog && newChangelog.trim()) {
			// For specific version, we'll create a standalone changelog section
			const versionOnly = versionArg.replace(/^v/, "");

			if (dryRun) {
				console.log(`\n--- Changelog for version ${versionOnly} ---`);
				console.log(newChangelog);
				console.log(`--- End of changelog for version ${versionOnly} ---\n`);
				console.log("💡 This was a dry run. Use without --dry to save to file.");
			} else {
				updateChangelogFile(newChangelog, versionOnly);
				console.log(`✅ Changelog saved to file for version ${versionOnly}`);
			}
		} else {
			console.log("ℹ️  No changes found for this version range");
		}
		return;
	}

	// Original logic for current/unreleased changes
	const currentVersion = getCurrentVersion();
	const latestTag = getLatestTag();

	// Check if current version matches latest tag - if so, generate changelog for that version
	// (unless --unreleased flag is used)
	if (latestTag && !unreleasedOnly) {
		const latestTagVersion = latestTag.replace(/^v/, "");

		if (latestTagVersion === currentVersion) {
			// Current version matches latest tag - generate changelog for that specific version
			console.log(`📋 Current version ${currentVersion} matches latest tag ${latestTag}`);
			console.log(`📝 Generating changelog for version ${currentVersion}...`);

			const targetTag = getSpecificTag(currentVersion);
			const previousTag = getPreviousTag(targetTag);

			console.log(
				`📝 Generating changelog between ${previousTag || "beginning"} and ${targetTag}...`
			);

			const newChangelog = generateChangelog(previousTag, targetTag);

			if (newChangelog && newChangelog.trim()) {
				if (dryRun) {
					console.log(`\n--- Changelog for version ${currentVersion} ---`);
					console.log(newChangelog);
					console.log(`--- End of changelog for version ${currentVersion} ---\n`);
					console.log("💡 This was a dry run. Use without --dry to save to file.");
				} else {
					updateChangelogFile(newChangelog, currentVersion);
					console.log(`✅ Changelog saved to file for version ${currentVersion}`);
				}
			} else {
				console.log("ℹ️  No changes found for this version range");
			}
			return;
		}
	}

	// Generate changelog for unreleased changes
	if (!unreleasedOnly && latestTag && !hasCommitsSinceTag(latestTag)) {
		console.log(`ℹ️  No new commits found since latest tag ${latestTag}.`);
		console.log("💡 To generate anyway, use: yarn changelog --unreleased");
		return;
	}

	if (latestTag && hasCommitsSinceTag(latestTag)) {
		console.log(`📝 Found commits since ${latestTag}. Generating changelog...`);
	}

	// For unreleased changes, we need to generate changelog for commits since the latest tag
	let newChangelog;
	try {
		if (latestTag) {
			// Generate changelog for commits since the latest tag
			const env = { ...process.env };
			env.CONVENTIONAL_CHANGELOG_GIT_RANGE = `${latestTag}..HEAD`;

			newChangelog = execSync("npx conventional-changelog -p angular -u", {
				encoding: "utf8",
				stdio: ["pipe", "pipe", "pipe"],
				env: env,
			});
		} else {
			// No tags exist, generate all unreleased changes
			newChangelog = execSync("npx conventional-changelog -p angular -u", {
				encoding: "utf8",
				stdio: ["pipe", "pipe", "pipe"],
			});
		}
	} catch (error) {
		console.error("Error generating unreleased changelog:", error.message);
		return;
	}

	if (newChangelog && newChangelog.trim()) {
		if (dryRun) {
			console.log(`\n--- Changelog for unreleased changes ---`);
			console.log(newChangelog);
			console.log(`--- End of changelog ---\n`);
			console.log("💡 This was a dry run. Use without --dry to save to file.");
		} else {
			updateChangelogFile(newChangelog);
			console.log("✅ Changelog generation completed!");

			if (latestTag && hasCommitsSinceTag(latestTag)) {
				console.log(`📋 Generated changelog entries for commits since ${latestTag}`);
			}
		}
	} else {
		console.log("ℹ️  No changes to add to changelog");
	}
}

if (require.main === module) {
	main();
}

module.exports = { generateChangelog, updateChangelogFile };
