import type * as T from "./Toast.types";

export const timeouts: Record<T.Timeout, number> = {
	short: 4000,
	long: 8000,
};
export const toastWidths: Record<T.WidthPreset, string | undefined> = {
	short: "320px",
	long: "400px",
};

export const positions: T.Position[] = [
	"top-start",
	"top",
	"top-end",
	"bottom-start",
	"bottom",
	"bottom-end",
];

const defaultPositionData = positions.reduce<T.Context["queues"]>(
	(acc, cur) => ({ [cur]: [], ...acc }),
	{} as T.Context["queues"]
);

export const defaultContextData = {
	queues: defaultPositionData,
	id: "",
	show: () => {},
	hide: () => {},
	remove: () => {},
	add: () => "",
};
