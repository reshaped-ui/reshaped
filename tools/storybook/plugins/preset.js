function managerEntries(entry = []) {
	return [...entry, require.resolve("./iframe.js")];
}

module.exports = {
	managerEntries,
};
