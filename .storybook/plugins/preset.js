function managerEntries(entry = []) {
	return [...entry, require.resolve("./iframe.js")];
}

export default {
	managerEntries,
};
