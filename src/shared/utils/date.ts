export const formatLongDate = (date?: string) => {
  if (!date) return '';

  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

export const formatDate = (date?: Date | null): string => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isAfterToday = (date?: Date) => {
  if (!date) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  const targetDate = date.toISOString().slice(0, 10);

  return targetDate > today;
};
