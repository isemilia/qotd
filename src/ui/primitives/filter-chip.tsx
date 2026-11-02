'use client';

import { cn } from '@/shared/utils/cn';
import { FC } from 'react';

export type FilterChipOption = { label: string; value: string };

export const FilterChip: FC<
  FilterChipOption & {
    isActive?: boolean;
    onClick?: (option: FilterChipOption) => void;
  }
> = ({ label, value, onClick, isActive }) => {
  return (
    <div
      className={cn(
        'grid h-7 max-w-fit cursor-pointer place-content-center rounded-full border border-transparent px-3 text-[12px] font-medium transition-all',
        isActive
          ? 'text-primary-foreground bg-primary font-semibold hover:opacity-80'
          : 'text-secondary border-secondary hover:bg-secondary/5',
      )}
      onClick={() => {
        onClick?.({ label, value });
      }}
    >
      {label}
    </div>
  );
};
