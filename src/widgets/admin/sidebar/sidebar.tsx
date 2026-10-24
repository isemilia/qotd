import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarProfile } from '@/widgets/admin/sidebar/components/sidebar-profile';
import { SidebarItemList } from '@/widgets/admin/sidebar/components/sidebar-item-list';

export const Sidebar: FC = () => {
  return (
    <aside
      className={
        'shadow-card flex w-[220px] shrink-0 flex-col justify-between rounded-[12px] bg-white px-3 py-4'
      }
    >
      <div>
        <Link href={'/'}>
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={104}
            height={18}
            className={'max-w-[104px]'}
          />
        </Link>

        <SidebarItemList />
      </div>

      <SidebarProfile />
    </aside>
  );
};
