import { cn } from '@/shared/utils/cn';
import { FieldLabel } from '@/ui/primitives/field';
import { RadioGroup, RadioGroupItem } from '@/ui/primitives/radio-group';
import { FC } from 'react';

export type ColorOption = {
  value: string;
  bg: string;
};

type ColorRadioProps = {
  options: ColorOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
};

export const ColorRadio: FC<ColorRadioProps> = ({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
}) => {
  return (
    <RadioGroup
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className='flex items-center'
    >
      {options.map((option) => (
        <FieldLabel
          key={option.value}
          htmlFor={option.value}
          className='cursor-pointer'
        >
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className='peer hidden'
          />

          <div className='peer-aria-checked:border-primary flex items-center justify-center rounded-full border-2 border-transparent p-1'>
            <div className={cn(option.bg, 'size-5 rounded-full')} />
          </div>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
};
