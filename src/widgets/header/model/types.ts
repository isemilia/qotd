import { TextColor } from '@/ui/primitives/text';
import { ComponentType, SVGProps } from 'react';

export type MenuItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color?: TextColor;
  // closeOnClick: boolean;
} & (
  | {
      href: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick: () => void;
    }
);

export type UserDropdownItemType = MenuItem & { closeOnClick?: boolean };
