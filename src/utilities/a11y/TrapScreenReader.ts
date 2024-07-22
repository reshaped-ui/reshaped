class TrapScreenReader {
	root: HTMLElement;

	/**
	 * Elements ignored by screen reader when trap is active
	 */
	private hiddenElements: HTMLElement[] = [];

	constructor(root: HTMLElement) {
		this.root = root;
	}

	/**
	 * Apply aria-hidden to all elements except the passed
	 */
	hideSiblingsFromScreenReader = (el: HTMLElement) => {
		let sibling = el.parentNode && (el.parentNode.firstChild as HTMLElement);

		while (sibling) {
			const notCurrent = sibling !== el;
			const isValid = sibling.nodeType === 1 && !sibling.hasAttribute("aria-hidden");

			if (notCurrent && isValid) {
				sibling.setAttribute("aria-hidden", "true");
				this.hiddenElements.push(sibling);
			}

			sibling = sibling.nextSibling as HTMLElement;
		}
	};

	release = () => {
		this.hiddenElements.forEach((el) => {
			el.removeAttribute("aria-hidden");
		});
		this.hiddenElements = [];
	};

	trap = () => {
		let currentEl = this.root;

		this.release();

		// Stop at the body level for regular pages
		// And stop at shadow root
		while (currentEl !== document.body && currentEl.parentElement) {
			this.hideSiblingsFromScreenReader(currentEl);
			currentEl = currentEl.parentElement as HTMLElement;
		}
	};
}

export default TrapScreenReader;
