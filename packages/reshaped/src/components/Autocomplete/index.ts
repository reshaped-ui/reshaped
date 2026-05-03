import Autocomplete, { AutocompleteItem } from "./Autocomplete";

const AutocompleteRoot = Autocomplete as typeof Autocomplete & {
	Item: typeof AutocompleteItem;
};

AutocompleteRoot.Item = AutocompleteItem;

export default AutocompleteRoot;
export type {
	Instance as AutocompleteInstance,
	Props as AutocompleteProps,
} from "./Autocomplete.types";
