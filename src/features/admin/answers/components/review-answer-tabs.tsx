import { FC, ReactNode, SVGProps } from 'react';
import { Text } from '@/ui/primitives/text';
import { cn } from '@/shared/utils/cn';

export const ReviewAnswerTabs: FC<{
  tabs: {
    label: string;
    value: string;
    icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}> = ({ tabs, onChange, value }) => {
  return (
    <div className={'flex flex-col gap-1'}>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <Text
            key={tab.value}
            component={'button'}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-[8px] px-3 py-2',
              tab.value === value && 'bg-muted font-medium',
            )}
            onClick={() => onChange?.(tab.value)}
          >
            <Icon className={'size-4 shrink-0'} /> {tab.label}
          </Text>
        );
      })}
    </div>
  );
};
