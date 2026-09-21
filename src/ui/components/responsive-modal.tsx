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
          className={cn('p-8 pb-9 gap-5', classNames?.dialogContent)}
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
          'py-6 px-6 pt-4 overflow-auto scrollbar-none',
          classNames?.drawerContent,
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};
