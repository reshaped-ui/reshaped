"use client";

import React from "react";
import { createPortal } from "react-dom";

import { positions, defaultContextData } from "./Toast.constants";
import ToastContext from "./Toast.context";
import * as T from "./Toast.types";
import ToastRegion from "./ToastRegion";

let counter = 0;
const generateId = () => `__rs-toast-${counter++}`;

const toastReducer: T.Reducer = (state, action) => {
	let nextState: T.Context["queues"];

	switch (action.type) {
		case "add": {
			const { position = "bottom-end", ...toastProps } = action.payload.toastProps || {};

			return {
				...state,
				[position]: [...state[position], { id: action.payload.id, toastProps, status: "entering" }],
			};
		}

		case "show": {
			const { id: showId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].map((item) => {
					if (item.status !== "entering") return item;
					return item.id === showId ? { ...item, status: "entered" } : item;
				});
			});

			return nextState;
		}

		case "hide": {
			const { id: hideId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].map((item) =>
					item.id === hideId ? { ...item, status: "exiting" } : item
				);
			});

			return nextState;
		}

		case "remove": {
			const { id: removeId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].filter((item) => item.id !== removeId);
			});

			return nextState;
		}
	}
};

const ToastProvider: React.FC<T.ProviderProps> = (props) => {
	const { children, options, containerRef } = props;
	const parent = React.useContext(ToastContext);
	const id = React.useId();
	const [data, dispatch] = React.useReducer(toastReducer, defaultContextData.queues);

	const localAdd = React.useCallback((toastProps: T.ShowProps) => {
		const id = generateId();

		dispatch({ type: "add", payload: { toastProps, id } });
		return id;
	}, []);

	const localHide = React.useCallback((id: string) => {
		dispatch({ type: "hide", payload: { id } });
	}, []);

	// Topmost provider in the tree — global toasts are delegated here
	const root = React.useMemo<T.RootContext>(
		() => parent.root ?? { add: localAdd, hide: localHide },
		[parent.root, localAdd, localHide]
	);

	const add = React.useCallback<T.Context["add"]>(
		(toastProps) => {
			if (toastProps.global) return root.add(toastProps);
			return localAdd(toastProps);
		},
		[root, localAdd]
	);

	const show = React.useCallback((id: string) => {
		dispatch({ type: "show", payload: { id } });
	}, []);

	const hide = React.useCallback<T.Context["hide"]>(
		(id, hideOptions) => {
			if (hideOptions?.global) return root.hide(id);
			return localHide(id);
		},
		[root, localHide]
	);

	const remove = React.useCallback((id: string) => {
		dispatch({ type: "remove", payload: { id } });
	}, []);

	const value = React.useMemo(
		() => ({
			queues: data,
			id,
			add,
			show,
			hide,
			remove,
			inspecting: false,
			options,
			root,
		}),
		[data, show, hide, add, remove, id, options, root]
	);

	const regions = positions.map((position) => (
		<ToastRegion position={position} key={position} nested={!!parent.id} />
	));

	const portalTarget = containerRef?.current ?? null;

	return (
		<ToastContext.Provider value={value}>
			{children}
			{portalTarget ? createPortal(<>{regions}</>, portalTarget) : regions}
		</ToastContext.Provider>
	);
};

ToastProvider.displayName = "ToastProiver";

export default ToastProvider;
