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
import { cn } from '@/shared/utils/cn';

export const ControlledTextarea: FC<{
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  maxLength?: number;
  className?: string;
}> = ({
  label,
  placeholder,
  description,
  name,
  required,
  control,
  maxLength,
  className,
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
                className={cn('min-h-[140px]', className)}
              />
              {maxLength ? (
                <Text
                  className={'absolute right-3 bottom-3 text-right text-[12px]'}
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
