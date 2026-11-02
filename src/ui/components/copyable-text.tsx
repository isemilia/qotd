'use client';

import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { Check, Copy } from 'lucide-react';
import { FC, useState } from 'react';

export const CopyableText: FC<{ children?: string; className?: string }> = ({
  children,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async (text?: string) => {
    if (!text) {
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <Text
      component={'button'}
      color={'inherit'}
      className={cn('flex cursor-pointer items-center gap-3', className)}
      onClick={() => handleClick(children)}
    >
      {copied ? (
        <Check className={'size-4 shrink-0'} />
      ) : (
        <Copy className={'size-4 shrink-0'} />
      )}

      <span>{children}</span>
    </Text>
  );
};
