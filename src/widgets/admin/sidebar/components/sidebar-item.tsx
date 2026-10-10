import { ComponentType, FC, SVGProps } from 'react';
import Link from 'next/link';
import { Text, TextColor } from '@/ui/primitives/text';
import { cn } from '@/shared/utils/cn';

export const SidebarItem: FC<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
  onClick?: () => void;
  color?: TextColor;
}> = ({ icon, label, href, onClick, color = 'primary' }) => {
  const Icon = icon;

  return (
    <Text
      component={href ? Link : 'button'}
      {...(href ? { href } : { onClick })}
      className={cn(
        'flex items-center gap-2 p-2 w-full cursor-pointer rounded-[8px] hover:bg-primary-foreground/70 text-[14px]',
        color === 'error' && 'hover:bg-destructive/5',
      )}
      color={color}
    >
      <Icon className={'size-4'} />
      {label}
    </Text>
  );
};
