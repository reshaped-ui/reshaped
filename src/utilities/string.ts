export const camelToKebab = (s: string) => {
	return s.replace(/([a-z][a-z])([A-Z]|[0-9])/g, "$1-$2").toLowerCase();
};

export const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};
