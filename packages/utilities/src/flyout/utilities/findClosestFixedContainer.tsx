import getShadowRoot from "dom/getShadowRoot";

type Args = {
	el: HTMLElement | null;
};

const findClosestPositionContainer = (args: Args & { iteration: number }) => {
	const { el, iteration = 0 } = args;
	const style = el && window.getComputedStyle(el);
	const position = style?.position;
	const isFixed = position === "fixed" || position === "sticky";

	if (iteration === 0) {
		const shadowRoot = getShadowRoot(el);
		if (shadowRoot?.firstElementChild) return shadowRoot.firstElementChild as HTMLElement;
	}

	if (el === document.body || !el) return document.body;
	if (isFixed) return el;

	return findClosestPositionContainer({ el: el.parentElement, iteration: iteration + 1 });
};

export default (args: Args) => findClosestPositionContainer({ ...args, iteration: 0 });
