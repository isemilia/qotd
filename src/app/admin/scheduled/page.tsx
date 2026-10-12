'use client';

import { Text } from '@/ui/primitives/text';
import { DataTable } from '@/ui/components/data-table';
import {
  QuestionStatus,
  QuestionStatusChip,
} from '@/ui/components/question-status-chip';

const data = [
  {
    id: '7a9e2d46-3f81-4b25-a6c9-1d8e5f0b7a34',
    uuid: '7a9e2d46-3f81-4b25-a6c9-1d8e5f0b7a34',
    question: 'What advice would you give your younger self?',
    creditName: '-',
    date: 'Sept 13, 2026',
    status: 'previous',
  },
  {
    id: 'c2f87b31-6a44-4f90-9d12-8e3b7a1c5d20',
    uuid: 'c2f87b31-6a44-4f90-9d12-8e3b7a1c5d20',
    question: 'What is something small that makes your day better?',
    creditName: 'Emilia',
    date: 'Sept 14, 2026',
    status: 'active',
  },
  {
    id: '00453107-e990-4064-8238-2b512f0a8e99',
    uuid: '00453107-e990-4064-8238-2b512f0a8e99',
    question: 'If you could instantly learn one skill, what would it be?',
    creditName: '-',
    date: 'Sept 15, 2026',
    status: 'next',
  },
  {
    id: '85156c84-df92-4e29-aa71-50f53ddd5e8e',
    uuid: '85156c84-df92-4e29-aa71-50f53ddd5e8e',
    question: 'What place would you love to visit again?',
    creditName: '-',
    date: 'Sept 16, 2026',
    status: 'scheduled',
  },
];

const columns = [
  {
    header: 'UUID',
    accessor: 'uuid',
    className: 'truncate max-w-[80px]',
  },
  {
    header: 'Question',
    accessor: 'question',
  },
  {
    header: 'Credit name',
    accessor: 'creditName',
  },
  {
    header: 'Date',
    accessor: 'date',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

const Page = () => {
  return (
    <div>
      <Text weight={'medium'} className={'text-[24px]'}>
        All questions
      </Text>
      <Text color={'secondary'} className={'text-[14px] mt-3'}>
        Manage scheduled and published questions
      </Text>

      <div className={'mt-4'}>
        <DataTable
          columns={columns}
          rows={data.map((item) => {
            return {
              ...item,
              status: (
                <QuestionStatusChip variant={item.status as QuestionStatus} />
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Page;
