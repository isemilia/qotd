import { FC } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/ui/primitives/field';
import { Controller } from 'react-hook-form';
import { RadioField, RadioFieldProps } from '@/ui/components/radio-field';

export type ControlledRadioFieldProps = Omit<
  RadioFieldProps,
  'value' | 'onChange'
> & {
  name: string;
  control: any;
  required?: boolean;
  label?: string;
};

export const ControlledRadioField: FC<ControlledRadioFieldProps> = ({
  name,
  control,
  required,
  label,
  options,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant={'label'}>
              {label} {required && '*'}
            </FieldLegend>
            <RadioField
              aria-invalid={fieldState.invalid}
              value={field.value}
              onChange={field.onChange}
              options={options}
              {...rest}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        );
      }}
    />
  );
};
