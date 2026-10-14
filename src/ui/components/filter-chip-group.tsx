'use client';

import { FC } from 'react';
import { FilterChip, FilterChipOption } from '@/ui/primitives/filter-chip';

export const FilterChipGroup: FC<{
  options: FilterChipOption[];
  value: FilterChipOption['value'];
  onChange?: (option: FilterChipOption) => void;
}> = ({ options, value, onChange }) => {
  return (
    <div className={'flex items-center gap-3'}>
      {options.map((option) => {
        return (
          <FilterChip
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={value === option.value}
            onClick={onChange}
          />
        );
      })}
    </div>
  );
};
