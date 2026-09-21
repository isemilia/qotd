import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/ui/primitives/field';
import { Controller } from 'react-hook-form';
import { FC } from 'react';
import { Textarea } from '@/ui/primitives/textarea';
import { Text } from '@/ui/primitives/text';

export const ControlledTextarea: FC<{
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  maxLength?: number;
}> = ({
  label,
  placeholder,
  description,
  name,
  required,
  control,
  maxLength,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const valueLength = (field.value as string)?.length;
        const exceedsMax = maxLength ? valueLength > maxLength : false;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {label} {required && '*'}
            </FieldLabel>
            <div className={'relative'}>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                className={'min-h-[140px]'}
              />
              {maxLength ? (
                <Text
                  className={'text-[12px] text-right absolute bottom-3 right-3'}
                  color={
                    fieldState.invalid || exceedsMax ? 'error' : 'secondary'
                  }
                >
                  {(field.value as string)?.length || 0}/{maxLength}
                </Text>
              ) : null}
            </div>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
