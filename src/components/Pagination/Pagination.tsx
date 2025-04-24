import PaginationControlled from "./PaginationControlled";
import PaginationUncontrolled from "./PaginationUncontrolled";
import * as T from "./Pagination.types";

const Pagination: React.FC<T.Props> = (props) => {
	const { page } = props;

	if (page !== undefined) return <PaginationControlled {...props} />;
	return <PaginationUncontrolled {...props} />;
};

Pagination.displayName = "Pagination";

export default Pagination;
