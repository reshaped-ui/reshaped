import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const configuration: UserConfig = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"header-max-length": [RuleConfigSeverity.Warning, "always", 120],
		"scope-empty": [RuleConfigSeverity.Error, "never"],
	},
};

export default configuration;
