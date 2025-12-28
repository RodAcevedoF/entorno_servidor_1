const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return dateFormatter.format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return dateTimeFormatter.format(date);
}

export function formatTime(value: string): string {
  if (!value) return '';
  const [hours, minutes] = String(value).split(':');
  if (!hours) return String(value);
  return `${hours.padStart(2, '0')}:${(minutes ?? '00').padStart(2, '0')}`;
}
