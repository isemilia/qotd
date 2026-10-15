'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui/primitives/input-group';
import { Field, FieldLabel } from '@/ui/primitives/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/primitives/popover';
import { Calendar } from '@/ui/primitives/calendar';
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

export const DatePickerInput: FC<{
  placeholder?: string;
  label?: string;
  value?: Date | null;
  onChange?: (value?: Date | null) => void;
}> = ({ label, placeholder, value: _value, onChange }) => {
  const value = _value || undefined;

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [displayValue, setDisplayValue] = React.useState(formatDate(value));

  return (
    <Field className='mx-auto'>
      <FieldLabel htmlFor='date-required'>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          className={'px-2!'}
          id='date-required'
          value={displayValue}
          placeholder={placeholder}
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
                >
                  <CalendarIcon className={'size-4 text-primary'} />
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
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
