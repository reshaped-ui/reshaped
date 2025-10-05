import { Rule, AtRule, Declaration } from "postcss";

export default () => {
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

				const baseStyles = new Rule({
					selector,
					nodes: [],
				});

				atRule.walkDecls((decl) => {
					if (decl.parent !== atRule) return;
					baseStyles.nodes.push(decl);
				});

				if (baseStyles.nodes.length) {
					baseRules.push(baseStyles);
				}

				// Save variable definitions
				atRule.walkAtRules("variable", (variableAtRule) => {
					const [name, ...defaultValueChunks] = variableAtRule.params.split(" ");
					const defaultValue = defaultValueChunks.join(" ");

					baseRules.push(
						new Rule({
							selector,
							nodes: [
								new Declaration({
									prop: `${name}-s`,
									value: defaultValue,
								}),
								new Declaration({
									prop: `${name}-m`,
									value: `var(${name}-s)`,
								}),
								new Declaration({
									prop: `${name}-l`,
									value: `var(${name}-m)`,
								}),
								new Declaration({
									prop: `${name}-xl`,
									value: `var(${name}-l)`,
								}),
								new Declaration({
									prop: name,
									value: `var(${name}-s)`,
								}),
							],
						})
					);

					["m", "l", "xl"].forEach((viewport) => {
						mqRules[viewport].push(
							new Rule({
								selector,
								nodes: [
									new Declaration({
										prop: name,
										value: `var(${name}-${viewport})`,
									}),
								],
							})
						);
					});
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
