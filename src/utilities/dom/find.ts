export const findParent = (element: HTMLElement, condition: (el: HTMLElement) => boolean) => {
	let currentElement = element.parentElement;

	while (currentElement) {
		if (condition(currentElement)) return currentElement;
		currentElement = currentElement.parentElement;
	}

	return null;
};
