import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function managerEntries(entry = []) {
	return [...entry, resolve(__dirname, "./iframe.mjs")];
}

export default {
	managerEntries,
};
