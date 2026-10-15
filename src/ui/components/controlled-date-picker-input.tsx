import { FC } from 'react';
import { DatePickerInput, DatePickerInputProps } from './date-picker-input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import { Controller } from 'react-hook-form';

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
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
