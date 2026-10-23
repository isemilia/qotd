export const formatLongDate = (date?: string) => {
  if (!date) return '';

  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

export type DateFormat = 'iso' | 'short' | 'long' | 'short-with-time';
export const formatDate = (
  _date?: Date | string | null,
  format: DateFormat = 'iso',
): string => {
  if (!_date) return '';

  const date = new Date(_date);

  switch (format) {
    case 'short': {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }

    case 'short-with-time': {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(date);
    }

    case 'long': {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }

    case 'iso':
    default: {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  }
};

export const isAfterToday = (date?: Date) => {
  if (!date) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  const targetDate = date.toISOString().slice(0, 10);

  return targetDate > today;
};

export const isBeforeToday = (date?: Date) => {
  if (!date) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  const targetDate = date.toISOString().slice(0, 10);

  return targetDate < today;
};
