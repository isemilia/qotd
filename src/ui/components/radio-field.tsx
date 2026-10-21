import { Field, FieldLabel, FieldSet } from '@/ui/primitives/field';
import { RadioGroup, RadioGroupItem } from '@/ui/primitives/radio-group';
import { ChangeEventHandler, FC } from 'react';
import { RadioGroupProps } from '@base-ui/react';

export type RadioFieldProps = {
  options: { name: string; label: string }[];
  value?: string;
  onChange?: ChangeEventHandler;
} & RadioGroupProps;

export const RadioField: FC<RadioFieldProps> = ({
  options,
  value,
  onChange,
  ...rest
}) => (
  <RadioGroup value={value} onChange={onChange} {...rest}>
    {options.map((option) => {
      return (
        <Field
          key={option.name}
          orientation='horizontal'
          className={'gap-2 items-center'}
        >
          <RadioGroupItem
            value={option.name}
            id={option.name}
            className={'border border-primary cursor-pointer'}
          />
          <FieldLabel
            htmlFor={option.name}
            className='font-normal cursor-pointer'
          >
            {option.label}
          </FieldLabel>
        </Field>
      );
    })}
  </RadioGroup>
);
