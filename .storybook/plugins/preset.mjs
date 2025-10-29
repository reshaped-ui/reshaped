import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function managerEntries(entry = []) {
	return [...entry, resolve(__dirname, "./iframe.mjs")];
}

export default {
	managerEntries,
};
