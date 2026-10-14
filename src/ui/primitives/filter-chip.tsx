'use client';

import { FC } from 'react';
import { cn } from '@/shared/utils/cn';

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
        'text-[12px] transition-all font-medium border border-transparent px-3 grid place-content-center h-7 max-w-fit cursor-pointer rounded-full',
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
