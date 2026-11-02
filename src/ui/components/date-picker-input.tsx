'use client';

import { cn } from '@/shared/utils/cn';
import { Calendar } from '@/ui/primitives/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui/primitives/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/primitives/popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { FC } from 'react';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export type DatePickerInputProps = {
  placeholder?: string;
  value?: Date | null;
  onChange?: (value?: Date | null) => void;
  id?: string;
  disabled?: boolean;
  unavailableDates?: Date[];
  minDate?: Date;
};

export const DatePickerInput: FC<DatePickerInputProps> = ({
  placeholder,
  value: _value,
  onChange,
  id,
  disabled,
  unavailableDates,
  minDate,
}) => {
  const value = _value || undefined;

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [displayValue, setDisplayValue] = React.useState(formatDate(value));

  return (
    <InputGroup
      id={id}
      className={cn(
        disabled &&
          'pointer-events-none, border-0! opacity-70 ring-0! outline-none!',
      )}
    >
      <InputGroupInput
        className={'px-2!'}
        id='date-required'
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          const date = new Date(e.target.value);
          setDisplayValue(e.target.value);
          if (isValidDate(date)) {
            onChange?.(date);
            setMonth(date);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <InputGroupAddon className={'pl-4'} align='inline-start'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroupButton
                id='date-picker'
                variant='ghost'
                size='icon-xs'
                aria-label='Select date'
                disabled={disabled}
              >
                <CalendarIcon className={'text-primary size-4'} />
                <span className='sr-only'>Select date</span>
              </InputGroupButton>
            }
          />
          <PopoverContent
            className='w-auto overflow-hidden p-0'
            align='end'
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode='single'
              selected={value}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onChange?.(date);
                setDisplayValue(formatDate(date));
                setOpen(false);
              }}
              disabled={[
                ...(unavailableDates ?? []),
                ...(minDate ? [{ before: minDate }] : []),
                ...(disabled ? [() => true] : []),
              ]}
              modifiers={{
                unavailable: unavailableDates,
              }}
              modifiersClassNames={{
                unavailable: 'pointer-events-none opacity-70 line-through',
              }}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
};
