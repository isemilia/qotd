'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/ui/primitives/skeleton';
import { getPaginationButtons } from '@/shared/utils/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
  className?: string;
  /* If provided, renders buttons and calls this instead of using links for navigation */
  onPageChange?: (page: number) => void;
  /* Query param name used for the page when using links for navigation */
  paramName?: string;
};

export const DynamicPagination: FC<Props> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  paramName = 'page',
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paginationButtons = getPaginationButtons({ currentPage, totalPages });

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, String(page));
    return `${pathname}?${params.toString()}`;
  };

  const renderItem = ({
    page,
    disabled,
    className: itemClassName,
    weight,
    children,
    label,
  }: {
    page: number;
    disabled?: boolean;
    className?: string;
    weight?: 'normal' | 'semibold';
    children: ReactNode;
    label?: string;
  }) => {
    const classes = cn(
      'grid place-content-center cursor-pointer size-8 rounded-[6px] transition-all',
      disabled && 'pointer-events-none opacity-60',
      itemClassName,
    );

    if (onPageChange) {
      return (
        <Text
          component={'button'}
          type={'button'}
          disabled={disabled}
          aria-label={label}
          weight={weight}
          className={classes}
          onClick={() => onPageChange(page)}
        >
          {children}
        </Text>
      );
    }

    return (
      <Text
        component={Link}
        href={disabled ? '#' : buildHref(page)}
        aria-label={label}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        weight={weight}
        className={classes}
        scroll={false}
      >
        {children}
      </Text>
    );
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-[14px] font-medium max-md:justify-center',
        className,
      )}
    >
      {renderItem({
        page: currentPage - 1,
        disabled: currentPage <= 1,
        label: 'Previous page',
        children: <ChevronLeft className={'size-4'} />,
      })}

      {paginationButtons.map((value, index) => {
        if (value === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={'grid size-8 place-content-center'}
            >
              …
            </span>
          );
        }

        const isActive = value === currentPage;
        return (
          <span key={value}>
            {renderItem({
              page: Number(value),
              weight: isActive ? 'semibold' : 'normal',
              className: isActive
                ? 'bg-primary text-primary-foreground'
                : undefined,
              label: `Page ${value}`,
              children: value,
            })}
          </span>
        );
      })}

      {renderItem({
        page: currentPage + 1,
        disabled: currentPage >= totalPages,
        label: 'Next page',
        children: <ChevronRight className={'size-4'} />,
      })}
    </div>
  );
};

export const DynamicPaginationSkeleton: FC<{ className?: string }> = ({
  className,
}) => <Skeleton className={cn('h-8 w-[200px]', className)} />;
