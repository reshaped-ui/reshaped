import type * as T from "./Calendar.types.js";
import CalendarControlled from "./CalendarControlled.js";
import CalendarUncontrolled from "./CalendarUncontrolled.js";

const Calendar: React.FC<T.Props> = (props) => {
	if (props.value !== undefined) return <CalendarControlled {...props} />;
	return <CalendarUncontrolled {...props} />;
};

Calendar.displayName = "Calendar";

export default Calendar;
