import { AtRule } from "postcss";

const LAYER_ORDER_PARAMS = "rs.global, rs.reset, rs.components, rs.overrides, rs.mixins";

/*
Prepends a global @layer order declaration to every CSS file that uses cascade layers.
Duplicate declarations across files are harmless - the first one the browser parses
establishes the order, and subsequent ones are no-ops. This guarantees predictable
layer priority regardless of which CSS module loads first.
*/
export default () => ({
	postcssPlugin: "layers",
	Once: (root) => {
		let hasLayerUsage = false;

		root.walkAtRules("layer", (rule) => {
			if (rule.nodes) {
				hasLayerUsage = true;
				return false;
			}
		});

		if (!hasLayerUsage) return;

		const first = root.first;
		const alreadyDeclared =
			first &&
			first.type === "atrule" &&
			first.name === "layer" &&
			first.params === LAYER_ORDER_PARAMS;

		if (alreadyDeclared) return;

		root.prepend(
			new AtRule({
				name: "layer",
				params: LAYER_ORDER_PARAMS,
			})
		);
	},
});
