import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarCheck, LayoutDashboard, ListPlus, Users } from 'lucide-react';
import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { SidebarItem } from '@/widgets/admin/sidebar/components/sidebar-item';
import { SidebarProfile } from '@/widgets/admin/sidebar/components/sidebar-profile';

export const Sidebar: FC = () => {
  const groups = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Questions',
      items: [
        {
          label: 'Scheduled',
          href: '/admin/scheduled',
          icon: CalendarCheck,
        },
        {
          label: 'Suggestions',
          href: '/admin/suggestions',
          icon: ListPlus,
        },
      ],
    },
    {
      title: 'Answers',
      items: [
        {
          label: 'Answers',
          href: '/admin/answers',
          icon: MessageLinearIcon,
        },
      ],
    },
    {
      title: 'Users',
      items: [
        {
          label: 'Users',
          href: '/admin/users',
          icon: Users,
        },
      ],
    },
  ];
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

        <div className={'mt-10 space-y-6'}>
          {groups.map((group) => {
            return (
              <div key={group.title}>
                <Text
                  font={'mono'}
                  color={'secondary'}
                  className={'uppercase text-[12px] tracking-[1px]'}
                >
                  {group.title}
                </Text>
                <div className={'mt-3 space-y-1'}>
                  {group.items.map((item) => {
                    return (
                      <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SidebarProfile />
    </aside>
  );
};
