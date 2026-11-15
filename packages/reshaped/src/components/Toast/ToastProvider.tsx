"use client";

import React from "react";
import { createPortal } from "react-dom";

import { defaultContextData, positions } from "./Toast.constants";
import ToastContext from "./Toast.context";
import * as T from "./Toast.types";
import ToastRegion from "./ToastRegion";
import useToast from "./useToast";

let counter = 0;
const generateId = () => `__rs-toast-${counter++}`;

const toastReducer: T.Reducer = (state, action) => {
	let nextState: T.Context["queues"];

	switch (action.type) {
		case "add": {
			const {
				position = "bottom-end",
				width = "short",
				...toastProps
			} = action.payload.toastProps || {};

			return {
				...state,
				[position]: [
					...state[position],
					{
						id: action.payload.id,
						toastProps: { ...toastProps, width },
						status: "entering",
					},
				],
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
	const { children, containerRef } = props;
	const parentToast = useToast();
	const id = React.useId();
	const [data, dispatch] = React.useReducer(toastReducer, defaultContextData.queues);
	const isRoot = !parentToast.id;

	const add = React.useCallback<T.Context["add"]>(
		(toastProps) => {
			// Global toasts bubble up until they reach the root provider
			if (toastProps.global && !isRoot) return parentToast.show(toastProps);

			const id = generateId();
			dispatch({ type: "add", payload: { toastProps, id } });
			return id;
		},
		[isRoot, parentToast]
	);

	const show = React.useCallback((id: string) => {
		dispatch({ type: "show", payload: { id } });
	}, []);

	const hide = React.useCallback<T.Context["hide"]>(
		(id, options) => {
			if (options?.global && !isRoot) return parentToast.hide(id, options);
			dispatch({ type: "hide", payload: { id } });
		},
		[isRoot, parentToast]
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
		}),
		[data, show, hide, add, remove, id]
	);

	// Regions rendered inside a custom container are positioned relative to it, even for the root provider
	const regions = positions.map((position) => (
		<ToastRegion position={position} key={position} nested={!isRoot || !!containerRef} />
	));
	const portalTarget = containerRef?.current;

	return (
		<ToastContext.Provider value={value}>
			{children}
			{portalTarget ? createPortal(regions, portalTarget) : regions}
		</ToastContext.Provider>
	);
};

ToastProvider.displayName = "ToastProiver";

export default ToastProvider;
