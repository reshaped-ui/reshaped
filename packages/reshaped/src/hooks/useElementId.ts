import React from "react";

const useElementId = (id?: string): string => {
	const generatedId = React.useId();

	if (id) return id;
	return generatedId;
};

export default useElementId;
