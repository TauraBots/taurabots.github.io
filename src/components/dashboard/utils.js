export const parseDateValue = (date) => {
  if (!date) {
    return null;
  }

  const [year, month, day] = date.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

export const formatDate = (date) => {
  const parsedDate = parseDateValue(date);

  return parsedDate ? parsedDate.toLocaleDateString('pt-BR') : '--';
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) || 0);

export const sortByName = (firstItem, secondItem) =>
  firstItem.name.localeCompare(secondItem.name, 'pt-BR', {
    sensitivity: 'base',
  });

export const formatDateTime = (dateTime) => {
  if (!dateTime) {
    return '--';
  }

  const parsedDate = new Date(dateTime);

  if (Number.isNaN(parsedDate.getTime())) {
    return '--';
  }

  return parsedDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDaysUntil = (date) => {
  const targetDate = parseDateValue(date);

  if (!targetDate) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );

  return Math.round((target - today) / (1000 * 60 * 60 * 24));
};
