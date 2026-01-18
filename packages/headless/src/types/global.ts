export type CSSVariable = `--${string}`;
export type StyleAttribute =
	| React.CSSProperties
	| (React.CSSProperties & Record<CSSVariable, string | number | undefined>);

type DataAttributes = object | Record<`data-${string}`, string | boolean>;

export type Attributes<TagName extends keyof React.JSX.IntrinsicElements | void = void> =
	// If tag name is not passed, fallback to HTMLElement attributes
	(TagName extends keyof React.JSX.IntrinsicElements
		? React.JSX.IntrinsicElements[TagName]
		: React.HTMLAttributes<HTMLElement>) &
		DataAttributes & { style?: StyleAttribute };
