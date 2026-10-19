'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/cn';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from 'react-day-picker';

import { Button, buttonVariants } from '@/ui/primitives/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from 'lucide-react';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: 'short' }),
        ...formatters,
      }}
      className={cn(
        'group/calendar w-fit rounded-xl bg-popover p-3 text-popover-foreground',
        '[--cell-size:2.25rem] [--cell-radius:0.625rem]',
        'select-none',
        className,
      )}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),

        months: cn('relative flex flex-col gap-4', defaultClassNames.months),

        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),

        nav: cn(
          'absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between',
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-9 rounded-lg text-muted-foreground',
          'transition-colors hover:bg-periwinkle-200 hover:text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-30',
          defaultClassNames.button_previous,
        ),

        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-9 rounded-lg text-muted-foreground',
          'transition-colors hover:bg-periwinkle-200 hover:text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-30',
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          'flex h-9 w-full items-center justify-center px-10',
          defaultClassNames.month_caption,
        ),

        caption_label: cn(
          'text-sm font-semibold tracking-tight text-primary select-none',
          captionLayout === 'label'
            ? ''
            : 'flex items-center gap-1 [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label,
        ),

        dropdowns: cn(
          'flex h-9 w-full items-center justify-center gap-2 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),

        dropdown_root: cn(
          'relative rounded-lg border border-border bg-background',
          'focus-within:ring-2 focus-within:ring-ring/40',
          defaultClassNames.dropdown_root,
        ),

        dropdown: cn(
          'absolute inset-0 cursor-pointer opacity-0',
          defaultClassNames.dropdown,
        ),

        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),

        weekdays: cn('flex w-full', defaultClassNames.weekdays),

        weekday: cn(
          'flex-1 py-2 text-center text-xs font-medium text-secondary',
          'select-none',
          defaultClassNames.weekday,
        ),

        week: cn('mt-1 flex w-full', defaultClassNames.week),

        week_number_header: cn(
          'w-(--cell-size) text-xs font-medium text-muted-foreground',
          defaultClassNames.week_number_header,
        ),

        week_number: cn(
          'flex size-(--cell-size) items-center justify-center text-xs text-muted-foreground',
          defaultClassNames.week_number,
        ),

        day: cn(
          'group/day relative aspect-square h-(--cell-size) w-full p-0 text-center',
          'rounded-(--cell-radius)',
          defaultClassNames.day,
        ),

        today: cn(
          'font-semibold text-primary-foreground',
          defaultClassNames.today,
        ),

        outside: cn(
          'text-muted-foreground/40',
          'aria-selected:text-muted-foreground/40',
          defaultClassNames.outside,
        ),

        disabled: cn(
          'text-muted-foreground/40',
          '[&>button]:cursor-not-allowed [&>button]:opacity-50',
          defaultClassNames.disabled,
        ),

        hidden: cn('invisible', defaultClassNames.hidden),

        range_start: cn(
          'rounded-l-(--cell-radius) bg-periwinkle-200',
          defaultClassNames.range_start,
        ),

        range_middle: cn(
          'rounded-none bg-periwinkle-200',
          defaultClassNames.range_middle,
        ),

        range_end: cn(
          'rounded-r-(--cell-radius) bg-periwinkle-200',
          defaultClassNames.range_end,
        ),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => (
          <div
            data-slot='calendar'
            ref={rootRef}
            className={cn(className)}
            {...rootProps}
          />
        ),

        Chevron: ({ className, orientation, ...chevronProps }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn('size-4 text-secondary', className)}
                {...chevronProps}
              />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4 text-secondary', className)}
                {...chevronProps}
              />
            );
          }

          return (
            <ChevronDownIcon
              className={cn('size-4 text-secondary', className)}
              {...chevronProps}
            />
          );
        },

        DayButton: (dayButtonProps) => (
          <CalendarDayButton locale={locale} {...dayButtonProps} />
        ),

        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className='flex size-(--cell-size) items-center justify-center text-center text-xs text-muted-foreground'>
              {children}
            </div>
          </td>
        ),

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-today={modifiers.today || undefined}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative flex aspect-square size-auto w-full min-w-(--cell-size)',
        'items-center justify-center rounded-(--cell-radius)',
        'border-0 p-0 text-sm text-primary font-normal leading-none',
        'transition-colors duration-150',
        'hover:bg-periwinkle-200 hover:text-primary hover:bg-[var(--midnight-100)]',
        'focus-visible:z-20 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'aria-disabled:pointer-events-none aria-disabled:opacity-40',
        'data-[outside=true]:text-muted-foreground/40',

        // Today
        'data-[today=true]:font-semibold',
        'data-[today=true]:text-primary',
        'data-[today=true]:ring-1',
        'data-[today=true]:ring-inset',
        'data-[today=true]:ring-periwinkle-300',

        // Selected date
        'data-[selected-single=true]:bg-primary',
        'data-[selected-single=true]:text-primary-foreground!',
        'data-[selected-single=true]:ring-0',
        'data-[selected-single=true]:hover:bg-primary',
        'data-[selected-single=true]:hover:text-primary-foreground',

        // Date ranges
        'data-[range-start=true]:rounded-(--cell-radius)',
        'data-[range-start=true]:bg-primary',
        'data-[range-start=true]:text-primary-foreground',
        'data-[range-end=true]:rounded-(--cell-radius)',
        'data-[range-end=true]:bg-primary',
        'data-[range-end=true]:text-primary-foreground',
        'data-[range-middle=true]:rounded-none',
        'data-[range-middle=true]:bg-periwinkle-200',
        'data-[range-middle=true]:text-primary',

        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
