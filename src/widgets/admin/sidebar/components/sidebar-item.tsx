import { ComponentType, FC, SVGProps } from 'react';
import Link from 'next/link';
import { Text, TextColor } from '@/ui/primitives/text';
import { cn } from '@/shared/utils/cn';
import { Spinner } from '@/ui/primitives/spinner';

export const SidebarItem: FC<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
  onClick?: () => void;
  color?: TextColor;
  loading?: boolean;
  isActive?: boolean;
}> = ({ icon, label, href, onClick, color = 'primary', loading, isActive }) => {
  const Icon = icon;

  return (
    <Text
      component={href ? Link : 'button'}
      {...(href ? { href } : { onClick })}
      className={cn(
        'flex items-center gap-2 p-2 w-full cursor-pointer rounded-[8px] hover:bg-primary-foreground/60 text-[14px]',
        color === 'error' && 'hover:bg-destructive/5',
        isActive && 'bg-primary-foreground font-medium',
      )}
      color={color}
    >
      {loading ? <Spinner /> : <Icon className={'size-4'} />}
      {label}
    </Text>
  );
};
