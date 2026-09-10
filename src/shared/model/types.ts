import { ComponentPropsWithoutRef, ElementType } from 'react';

export type DynamicProps<
  Element extends ElementType,
  Props extends object = object,
> = {
  component?: Element;
} & ComponentPropsWithoutRef<Element> &
  Props;
