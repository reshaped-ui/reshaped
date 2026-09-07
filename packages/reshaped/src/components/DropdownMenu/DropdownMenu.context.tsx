"use client";

import React from "react";

import type * as T from "./DropdownMenu.types";

const DropdownMenuContext = React.createContext<T.Context>({});

export const useDropdownMenu = () => React.useContext(DropdownMenuContext);

/**
 * Shares the root menu configuration with its items and submenus.
 * Submenus render their own DropdownMenu, so the values they don't
 * define themselves are inherited from the menu they're nested in.
 */
export const DropdownMenuProvider: React.FC<T.ProviderProps> = (props) => {
	const { size, children } = props;
	const parentContext = useDropdownMenu();
	const resolvedSize = size ?? parentContext.size;
	const value = React.useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

	return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
};

DropdownMenuProvider.displayName = "DropdownMenu.Provider";

export default DropdownMenuContext;
