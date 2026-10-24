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
          className={'items-center gap-2'}
        >
          <RadioGroupItem
            value={option.name}
            id={option.name}
            className={'border-primary cursor-pointer border'}
          />
          <FieldLabel
            htmlFor={option.name}
            className='cursor-pointer font-normal'
          >
            {option.label}
          </FieldLabel>
        </Field>
      );
    })}
  </RadioGroup>
);
