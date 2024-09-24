export const getShadowRoot = (el: HTMLElement | null) => {
	const rootNode = el?.getRootNode();
	return rootNode instanceof ShadowRoot ? rootNode : null;
};
