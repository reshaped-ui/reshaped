#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline");

/**
 * Comprehensive release script that handles the entire release process:
 * 1. Prompts about tests
 * 2. Bumps version and creates tag
 * 3. Generates and commits changelog
 * 4. Builds and publishes package
 * 5. Pushes changes and tags to git
 */

function getVersionType() {
	const args = process.argv.slice(2);
	const versionType = args[0];

	if (versionType && ["patch", "minor", "major"].includes(versionType)) {
		return versionType;
	}

	return null;
}

function promptForVersionType() {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log("📦 Select release type:");
		console.log("  1. patch (bug fixes)");
		console.log("  2. minor (new features)");
		console.log("  3. major (breaking changes)");

		rl.question("Enter choice (1-3): ", (answer) => {
			rl.close();

			switch (answer.trim()) {
				case "1":
					resolve("patch");
					break;
				case "2":
					resolve("minor");
					break;
				case "3":
					resolve("major");
					break;
				default:
					console.log("❌ Invalid choice. Exiting.");
					process.exit(1);
			}
		});
	});
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

	// Prompt about chromatic tests
	const testsConfirmed = await promptForConfirmation("🧪 Have you updated chromatic tests?");
	if (!testsConfirmed) {
		console.log("❌ Please update chromatic tests before releasing. Exiting.");
		process.exit(1);
	}

	// Get version type
	let versionType = getVersionType();
	if (!versionType) {
		versionType = await promptForVersionType();
	}

	console.log(`\n📦 Releasing ${versionType} version...\n`);

	// Final confirmation
	const releaseConfirmed = await promptForConfirmation(
		`🔥 Ready to release ${versionType} version?`
	);
	if (!releaseConfirmed) {
		console.log("❌ Release cancelled.");
		process.exit(1);
	}

	console.log("\n🎯 Starting release process...\n");

	// Step 1: Version bump and changelog
	runCommand(`npm version ${versionType}`, `Bump ${versionType} version and generate changelog`);

	// Step 2: Build and publish
	runCommand("yarn build", "Build package");
	runCommand("yarn publish", "Publish to npm");

	// Step 3: Run release copy script
	runCommand("sh ./bin/release-copy.sh", "Copy release files");

	// Step 4: Push to git
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
