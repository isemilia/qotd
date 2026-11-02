import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import { Input } from '@/ui/primitives/input';
import { Text } from '@/ui/primitives/text';
import { ComponentPropsWithoutRef, FC, HTMLInputTypeAttribute } from 'react';
import { Controller } from 'react-hook-form';

export const ControlledInput: FC<
  {
    name: string;
    control: any;
    required?: boolean;
    label?: string;
    placeholder?: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    subtitle?: string;
  } & Pick<ComponentPropsWithoutRef<typeof Input>, 'variant'>
> = ({
  label,
  placeholder,
  description,
  name,
  required,
  control,
  type,
  variant,
  disabled,
  subtitle,
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
            {subtitle && (
              <Text className={'-mt-1'} color={'secondary'}>
                {subtitle}
              </Text>
            )}
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              type={type}
              variant={variant}
              disabled={disabled}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
