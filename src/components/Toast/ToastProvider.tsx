"use client";

import React from "react";
import ToastContext from "./Toast.context";
import ToastRegion from "./ToastRegion";
import { positions, defaultContextData } from "./Toast.constants";
import * as T from "./Toast.types";

let counter = 0;
const generateId = () => `__rs-toast-${counter++}`;

const toastReducer: T.Reducer = (state, action) => {
	let nextState: T.Context["queues"];

	switch (action.type) {
		case "add":
			const { position = "bottom-end", ...toastProps } = action.payload.toastProps || {};

			return {
				...state,
				[position]: [...state[position], { id: action.payload.id, toastProps, status: "entering" }],
			};

		case "show":
			const { id: showId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].map((item) => {
					return item.id === showId ? { ...item, status: "entered" } : item;
				});
			});

			return nextState;

		case "hide":
			const { id: hideId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].map((item) =>
					item.id === hideId ? { ...item, status: "exiting" } : item
				);
			});

			return nextState;

		case "remove":
			const { id: removeId } = action.payload;
			nextState = { ...state };

			positions.forEach((position) => {
				nextState[position] = nextState[position].filter((item) => item.id !== removeId);
			});

			return nextState;
	}
};

const ToastProvider = (props: T.ProviderProps) => {
	const { children, options } = props;
	const [data, dispatch] = React.useReducer(toastReducer, defaultContextData.queues);

	const add = React.useCallback<T.Context["add"]>((toastProps) => {
		const id = generateId();

		dispatch({ type: "add", payload: { toastProps, id } });
		return id;
	}, []);

	const show = React.useCallback((id: string) => {
		dispatch({ type: "show", payload: { id } });
	}, []);

	const hide = React.useCallback((id: string) => {
		dispatch({ type: "hide", payload: { id } });
	}, []);

	const remove = React.useCallback((id: string) => {
		dispatch({ type: "remove", payload: { id } });
	}, []);

	const value = React.useMemo(
		() => ({
			queues: data,
			add,
			show,
			hide,
			remove,
			inspecting: false,
			options,
		}),
		[data, show, hide, add, remove, options]
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{positions.map((position) => (
				<ToastRegion position={position} key={position} />
			))}
		</ToastContext.Provider>
	);
};

export default ToastProvider;
