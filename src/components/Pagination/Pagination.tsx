import PaginationControlled from "./PaginationControlled";
import PaginationUncontrolled from "./PaginationUncontrolled";
import * as T from "./Pagination.types";

const Pagination = (props: T.Props) => {
	const { page } = props;

	if (page !== undefined) return <PaginationControlled {...props} />;
	return <PaginationUncontrolled {...props} />;
};

export default Pagination;
