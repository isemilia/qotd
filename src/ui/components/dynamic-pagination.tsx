import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DynamicPagination: FC<{
  currentPage: number;
  totalPages: number;
  className?: string;
}> = ({ className, currentPage, totalPages }) => {
  // todo: refactor for readability
  const getPaginationButtons = () => {
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

  const paginationButtons = getPaginationButtons();

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-[14px] font-medium',
        className,
      )}
    >
      <Text
        component={Link}
        href={currentPage === 1 ? '#' : `?page=${currentPage - 1}`}
        className={cn(
          'grid place-content-center size-8 rounded-[6px]',
          currentPage === 1 && 'pointer-events-none opacity-60',
        )}
      >
        <ChevronLeft className={'size-4'} />
      </Text>
      {paginationButtons.map((value) => {
        const isActive = value === currentPage;
        return (
          <Text
            key={value}
            component={Link}
            href={value === '...' ? '#' : `?page=${value}`}
            color={'primary'}
            weight={isActive ? 'semibold' : 'normal'}
            className={cn(
              'grid place-content-center transition-all size-8 rounded-[6px]',
              isActive && 'bg-primary text-primary-foreground',
            )}
          >
            {value}
          </Text>
        );
      })}
      <Text
        component={Link}
        href={currentPage === totalPages ? '#' : `?page=${currentPage + 1}`}
        className={cn(
          'grid place-content-center size-8 rounded-[6px]',
          currentPage === totalPages && 'pointer-events-none opacity-60',
        )}
      >
        <ChevronRight className={'size-4'} />
      </Text>
    </div>
  );
};
