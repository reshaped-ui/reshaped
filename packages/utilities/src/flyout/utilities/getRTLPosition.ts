import { Position } from "../types";

const getRTLPosition = (position: Position) => {
	if (position.includes("start")) return position.replace("start", "end") as Position;
	if (position.includes("end")) return position.replace("end", "start") as Position;
	return position;
};

export default getRTLPosition;
