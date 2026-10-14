// todo: refactor for readability
export const getPaginationButtons = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  if (totalPages < 5) {
    return Array.from({ length: totalPages }, (_, i) => {
      return i + 1;
    });
  }
  if (currentPage === 1) {
    return [currentPage, currentPage + 1, '...', totalPages];
  }
  if (currentPage > 1 && currentPage < totalPages) {
    if (currentPage === 2) {
      return [1, currentPage, currentPage + 1, '...', totalPages];
    }
    if (currentPage - 1 === 2) {
      return [
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }
    if (currentPage + 1 === totalPages - 1) {
      return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        totalPages,
      ];
    }
    if (currentPage + 1 === totalPages) {
      return [1, '...', currentPage - 1, currentPage, totalPages];
    }
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  }
  if (currentPage === totalPages) {
    return [1, '...', currentPage - 1, currentPage];
  }

  // fallback
  return [currentPage];
};
