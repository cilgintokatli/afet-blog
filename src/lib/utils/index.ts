export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('tr-TR', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}
