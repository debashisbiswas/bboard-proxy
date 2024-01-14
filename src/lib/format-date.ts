import { DateTime } from "luxon";

export function formatDate(date: Date): string {
	const now = DateTime.now();
	const datetime = DateTime.fromJSDate(date);

	let result = datetime.toLocaleString(DateTime.DATETIME_SHORT);
	if (datetime >= now.startOf('day')) {
		result = 'Today, ' + datetime.toLocaleString(DateTime.TIME_SIMPLE);
	} else if (datetime >= now.minus({ days: 1 }).startOf('day')) {
		result = 'Yesterday, ' + datetime.toLocaleString(DateTime.TIME_SIMPLE);
	}

	return result;
}
