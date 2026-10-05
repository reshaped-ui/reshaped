import * as T from "./Pagination.types.js";
import PaginationControlled from "./PaginationControlled.js";
import PaginationUncontrolled from "./PaginationUncontrolled.js";

const Pagination: React.FC<T.Props> = (props) => {
	const { page } = props;

	if (page !== undefined) return <PaginationControlled {...props} />;
	return <PaginationUncontrolled {...props} />;
};

Pagination.displayName = "Pagination";

export default Pagination;
