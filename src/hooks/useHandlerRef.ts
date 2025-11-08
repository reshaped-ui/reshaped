import React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/**
 * Hook for wrapping event handlers passed as props with a ref
 * This way we can keep the instance of the ref the same and pass this ref to the effects dependency array
 * While also making sure that function implementation stays up-to-date
 */

const useHandlerRef = <T>(cb: T): React.RefObject<T> => {
	const ref = React.useRef(cb);

	// Update the callback on every render, keeping the ref instance the same
	useIsomorphicLayoutEffect(() => {
		ref.current = cb;
	}, [cb]);

	return ref;
};

export default useHandlerRef;
