const { Rule, AtRule, Declaration } = require("postcss");

module.exports = () => {
	return {
		postcssPlugin: "responsive",
		Once: (root) => {
			const mqRules = { m: [], l: [], xl: [] };

			root.walkAtRules("responsive", (atRule) => {
				// In case a multi-element selector is passed, we receive it as multiple parameters
				// so we need to convert them back to a selector
				const [...params] = atRule.params.split(" ");
				const selector = params.join(" ");
				const baseRules = [];

				// Save variable definitions
				atRule.walkAtRules("variable", (variableAtRule) => {
					const [name, ...defaultValueChunks] = variableAtRule.params.split(" ");
					const defaultValue = defaultValueChunks.join(" ");

					baseRules.push(
						new Rule({
							selector,
							nodes: [
								defaultValue !== undefined &&
									new Declaration({
										prop: `${name}-s`,
										value: defaultValue,
									}),
								new Declaration({
									prop: name,
									value: `var(${name}-s)`,
								}),
							].filter(Boolean),
						})
					);

					mqRules.m.push(
						new Rule({
							selector,
							nodes: [
								new Declaration({
									prop: name,
									value: `var(${name}-m, var(${name}-s))`,
								}),
							],
						})
					);

					mqRules.l.push(
						new Rule({
							selector,
							nodes: [
								new Declaration({
									prop: name,
									value: `var(${name}-l, var(${name}-m, var(${name}-s)))`,
								}),
							],
						})
					);

					mqRules.xl.push(
						new Rule({
							selector,
							nodes: [
								new Declaration({
									prop: name,
									value: `var(${name}-xl, var(${name}-l, var(${name}-m, var(${name}-s))))`,
								}),
							],
						})
					);
				});

				atRule.walkAtRules("value", (valueAtRule) => {
					const value = valueAtRule.params;

					if (value !== "false") {
						baseRules.push(
							new Rule({
								selector: value === "true" ? selector : `${selector}-${value}`,
								nodes: valueAtRule.nodes,
							})
						);
					}

					["m", "l", "xl"].forEach((viewport) => {
						mqRules[viewport].push(
							new Rule({
								selector: `${selector}-${value}--${viewport}`,
								nodes: valueAtRule.nodes,
							})
						);
					});
				});

				atRule.replaceWith(baseRules);
			});

			root.append(
				new AtRule({
					name: "media",
					params: "(--rs-viewport-m)",
					nodes: mqRules.m,
				})
			);

			root.append(
				new AtRule({
					name: "media",
					params: "(--rs-viewport-l)",
					nodes: mqRules.l,
				})
			);

			root.append(
				new AtRule({
					name: "media",
					params: "(--rs-viewport-xl)",
					nodes: mqRules.xl,
				})
			);
		},
	};
};
