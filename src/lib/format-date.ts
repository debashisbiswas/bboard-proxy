export function formatDate(date: Date) {
	return date.toLocaleDateString('en-US', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	});
}
