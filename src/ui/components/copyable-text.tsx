'use client';

import { FC, useState } from 'react';
import { Text } from '@/ui/primitives/text';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

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
      className={cn('flex items-center gap-3 cursor-pointer', className)}
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
