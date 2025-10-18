import Autocomplete, { AutocompleteItem } from "./Autocomplete";
import type * as T from "./Autocomplete.types";

const AutocompleteRoot = Autocomplete as React.FC<T.Props> & {
	Item: typeof AutocompleteItem;
};

AutocompleteRoot.Item = AutocompleteItem;

export default AutocompleteRoot;
export type {
	Props as AutocompleteProps,
	Instance as AutocompleteInstance,
} from "./Autocomplete.types";
