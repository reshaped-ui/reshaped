type XSide = "start" | "end";
type YSide = "top" | "bottom";

export type Side = XSide | YSide;
export type Position = `${YSide}` | `${YSide}-${XSide}` | `${XSide}` | `${XSide}-${YSide}`;
