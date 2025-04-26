"use client";

import React from "react";
import PaginationControlled from "./PaginationControlled";
import * as T from "./Pagination.types";

const PaginationUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultPage = 1, onChange, ...controlledProps } = props;
	const [page, setPage] = React.useState(defaultPage || 1);

	const handleChange: T.Props["onChange"] = (args) => {
		setPage(args.page);
		onChange?.(args);
	};

	return <PaginationControlled {...controlledProps} onChange={handleChange} page={page} />;
};

PaginationUncontrolled.displayName = "PaginationUncontrolled";

export default PaginationUncontrolled;
