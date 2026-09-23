import { ColorOption, ColorRadio } from '@/ui/primitives/color-radio';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/ui/primitives/field';

type ControlledColorRadioProps = {
  name: string;
  control: any;
  options: ColorOption[];
  required?: boolean;
  label?: string;
  className?: string;
};

export const ControlledColorRadio: FC<ControlledColorRadioProps> = ({
  name,
  control,
  options,
  required,
  label,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {label && (
            <FieldLabel>
              {label} {required && '*'}
            </FieldLabel>
          )}

          <ColorRadio
            options={options}
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
