import CalendarControlled from "./CalendarControlled";
import CalendarUncontrolled from "./CalendarUncontrolled";
import type * as T from "./Calendar.types";

const Calendar = (props: T.Props) => {
	if (props.value !== undefined) return <CalendarControlled {...props} />;
	return <CalendarUncontrolled {...props} />;
};

export default Calendar;
