import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/utils/cn';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'QOTD',
  description:
    'A question every day. Share your answer and see what the community has to say. Your answers are always anonymous.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        dmSans.variable,
        dmMono.variable,
        'font-sans',
      )}
    >
      <body className='min-h-full flex flex-col text-primary leading-[1.2]'>
        {children}
      </body>
    </html>
  );
}
