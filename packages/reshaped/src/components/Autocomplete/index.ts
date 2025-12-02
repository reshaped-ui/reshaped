import Autocomplete, { AutocompleteItem } from "./Autocomplete";

const AutocompleteRoot = Autocomplete as typeof Autocomplete & {
	Item: typeof AutocompleteItem;
};

AutocompleteRoot.Item = AutocompleteItem;

export default AutocompleteRoot;
export type {
	Props as AutocompleteProps,
	Instance as AutocompleteInstance,
} from "./Autocomplete.types";
