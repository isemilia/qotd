import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarProfile } from '@/widgets/admin/sidebar/components/sidebar-profile';
import { SidebarItemList } from '@/widgets/admin/sidebar/components/sidebar-item-list';

export const Sidebar: FC = () => {
  return (
    <aside
      className={
        'bg-white shadow-card rounded-[12px] w-[220px] py-4 px-3 flex flex-col justify-between'
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
