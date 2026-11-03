import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/primitives/select';
import { ComponentPropsWithoutRef, FC } from 'react';
import { Controller } from 'react-hook-form';

type SelectOption = {
  value: string;
  label: string;
};

export const ControlledSelect: FC<
  {
    name: string;
    control: any;
    options: SelectOption[];
    required?: boolean;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
  } & Pick<ComponentPropsWithoutRef<typeof SelectTrigger>, 'variant'>
> = ({
  name,
  control,
  options,
  required,
  label,
  placeholder = 'Select an option...',
  description,
  disabled,
  variant,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && '*'}
          </FieldLabel>

          <Select
            items={options}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={field.name}
              aria-invalid={fieldState.invalid}
              variant={variant}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
