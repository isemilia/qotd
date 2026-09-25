export const getTimeGap = (date: string) => {
  const created = new Date(date).getTime();
  const now = new Date().getTime();

  const ms = Math.abs(created - now);
  const minutes = Math.floor(ms / 1000 / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) {
    return 'now';
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  if (hours < 24) {
    return `${hours}h`;
  }

  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(new Date(date)).replaceAll('/', '.');
};
