import type * as T from "../tokens/types";

const resolveTokenReference = <ReferencedToken>(
	theme: T.ThemeDefinition,
	tokenType: T.TokenType,
	ref: string
): ReferencedToken => {
	const tokenGroup = theme[tokenType];
	let referencedToken: ReferencedToken | null = null;

	Object.keys(tokenGroup).forEach((tokenName) => {
		if (referencedToken) return;
		if (tokenName === ref) referencedToken = (tokenGroup as any)[tokenName];
	});

	if (!referencedToken) throw new Error(`Referenced token not found for: ${ref}`);
	return referencedToken;
};

export default resolveTokenReference;
