import CalendarControlled from "./CalendarControlled";
import CalendarUncontrolled from "./CalendarUncontrolled";

import type * as T from "./Calendar.types";

const Calendar: React.FC<T.Props> = (props) => {
	if (props.value !== undefined) return <CalendarControlled {...props} />;
	return <CalendarUncontrolled {...props} />;
};

Calendar.displayName = "Calendar";

export default Calendar;
