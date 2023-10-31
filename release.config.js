/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
	branches: ["main", "master"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		[
			"@semantic-release/changelog",
			{
				changelogTitle: "# Changelog",
			},
		],
		"@semantic-release/npm",
		[
			"@semantic-release/git",
			{
				assets: ["CHANGELOG.md", "package.json"],
				message: "chore(global): publish",
			},
		],
	],
};
