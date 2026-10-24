import { FC, ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/ui/primitives/dialog';
import { Drawer, DrawerContent } from '@/ui/primitives/drawer';
import { cn } from '@/shared/utils/cn';

export const ResponsiveModal: FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  classNames?: {
    dialogContent?: string;
    drawerContent?: string;
  };
}> = ({ open, onOpenChange, children, classNames }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn('gap-5 p-8 pb-9', classNames?.dialogContent)}
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer showSwipeHandle open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn(
          'scrollbar-none overflow-auto px-6 py-6 pt-4',
          classNames?.drawerContent,
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};
