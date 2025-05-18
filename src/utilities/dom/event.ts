/**
 * Workaround for changing a hidden input value with triggerring
 * React input onChange and form onChange handlers
 *
 * Based on https://stackoverflow.com/a/60378508
 */
export const triggerChangeEvent = (el: HTMLInputElement, value: string) => {
	const nativeInputValueSetter = Object!.getOwnPropertyDescriptor(
		window.HTMLInputElement.prototype,
		"value"
	)!.set;

	nativeInputValueSetter!.call(el, value);
	el.dispatchEvent(new Event("change", { bubbles: true }));
};
