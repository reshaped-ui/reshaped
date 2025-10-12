#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline");

/**
 * Comprehensive release script that handles the entire release process:
 * 1. Prompts about tests
 * 2. Runs Changesets to bump version and update changelog
 * 3. Commits changes and creates tag
 * 4. Builds and publishes package
 * 5. Pushes changes and tags to git
 */

function checkForChangesets() {
	const fs = require("fs");
	const path = require("path");
	const changesetsDir = path.join(process.cwd(), ".changeset");

	if (!fs.existsSync(changesetsDir)) {
		return false;
	}

	const files = fs.readdirSync(changesetsDir);
	const changesetFiles = files.filter((file) => file.endsWith(".md") && file !== "README.md");

	return changesetFiles.length > 0;
}

function promptForConfirmation(message) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(`${message} (y/N): `, (answer) => {
			rl.close();
			resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
		});
	});
}

function runCommand(command, description) {
	console.log(`🔄 ${description}...`);
	try {
		execSync(command, { stdio: "inherit" });
		console.log(`✅ ${description} completed`);
	} catch (error) {
		console.error(`❌ ${description} failed:`, error.message);
		process.exit(1);
	}
}

function checkGitStatus() {
	try {
		const status = execSync("git status --porcelain", { encoding: "utf8" });
		if (status.trim()) {
			console.log("❌ Working directory is not clean. Please commit or stash changes first.");
			console.log("Uncommitted changes:");
			console.log(status);
			process.exit(1);
		}
	} catch (error) {
		console.error("❌ Failed to check git status:", error.message);
		process.exit(1);
	}
}

function getCurrentBranch() {
	try {
		return execSync("git branch --show-current", { encoding: "utf8" }).trim();
	} catch (error) {
		console.error("❌ Failed to get current branch:", error.message);
		process.exit(1);
	}
}

async function main() {
	console.log("🚀 Starting release process...\n");

	// Check git status
	console.log("📋 Checking git status...");
	checkGitStatus();

	const currentBranch = getCurrentBranch();
	console.log(`📍 Current branch: ${currentBranch}`);

	// Check for changesets
	if (!checkForChangesets()) {
		console.log("❌ No changesets found. Please create changesets before releasing.");
		console.log("💡 Run 'pnpm changeset' to create a changeset.");
		process.exit(1);
	}

	console.log("✅ Found changesets to release\n");

	// Prompt about chromatic tests
	const testsConfirmed = await promptForConfirmation("🧪 Have you updated chromatic tests?");
	if (!testsConfirmed) {
		console.log("❌ Please update chromatic tests before releasing. Exiting.");
		process.exit(1);
	}

	// Final confirmation
	const releaseConfirmed = await promptForConfirmation(
		`🔥 Ready to consume changesets and release?`
	);
	if (!releaseConfirmed) {
		console.log("❌ Release cancelled.");
		process.exit(1);
	}

	console.log("\n🎯 Starting release process...\n");

	// Step 1: Version bump using Changesets
	runCommand(`pnpm changeset version`, `Consume changesets and update version`);

	// Step 2: Commit the version changes
	runCommand(`git add .`, `Stage version and changelog changes`);
	runCommand(`git commit -m "chore: release version"`, `Commit version changes`);

	// Step 3: Create git tag
	const packageJson = require("../package.json");
	const newVersion = packageJson.version;
	runCommand(`git tag v${newVersion}`, `Create tag v${newVersion}`);

	// Step 4: Build and publish
	runCommand("pnpm build", "Build package");
	runCommand("pnpm publish --no-git-checks", "Publish to npm");

	// Step 5: Run release copy script
	runCommand("sh ./bin/release-copy.sh", "Copy release files");

	// Step 6: Push to git
	runCommand("git push", "Push commits to git");
	runCommand("git push --tags", "Push tags to git");

	console.log("\n🎉 Release completed successfully!");
	console.log("📦 Package published to npm");
	console.log("🏷️ Tags pushed to git");
	console.log("📝 Changelog updated");
}

// Handle process interruption
process.on("SIGINT", () => {
	console.log("\n❌ Release process interrupted. Exiting.");
	process.exit(1);
});

if (require.main === module) {
	main().catch((error) => {
		console.error("❌ Release failed:", error.message);
		process.exit(1);
	});
}
