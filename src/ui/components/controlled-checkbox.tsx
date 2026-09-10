import { Field, FieldLabel } from '@/ui/primitives/field';
import { Controller } from 'react-hook-form';
import { FC, ReactNode } from 'react';
import { Checkbox } from '@/ui/primitives/checkbox';

export const ControlledCheckbox: FC<{
  name: string;
  control: any;
  label?: ReactNode;
}> = ({ label, name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation='horizontal'
            className={'items-start gap-3'}
          >
            <Checkbox
              {...field}
              onCheckedChange={field.onChange}
              checked={field.value}
              id={field.name}
              name={field.name}
              aria-invalid={fieldState.invalid}
              className={'mt-0.5 size-5'}
            />
            <FieldLabel className={'block font-medium'}>{label}</FieldLabel>
          </Field>
        );
      }}
    />
  );
};
