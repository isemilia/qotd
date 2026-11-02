import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DatePickerInput, DatePickerInputProps } from './date-picker-input';

export type ControlledDatePickerInputProps = DatePickerInputProps & {
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  description?: string;
};

export const ControlledDatePickerInput: FC<ControlledDatePickerInputProps> = ({
  name,
  control,
  required,
  label,
  placeholder,
  disabled,
  description,
  unavailableDates,
  minDate,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {label} {required && '*'}
            </FieldLabel>
            <DatePickerInput
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value}
              onChange={field.onChange}
              unavailableDates={unavailableDates}
              minDate={minDate}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
