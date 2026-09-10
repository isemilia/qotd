import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import { Input } from '@/ui/primitives/input';
import { Controller } from 'react-hook-form';
import { FC } from 'react';

export const ControlledInput: FC<{
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
}> = ({ label, placeholder, description, name, required, control }) => {
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
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
