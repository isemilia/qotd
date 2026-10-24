import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/utils/cn';
import { QueryProvider } from '@/shared/providers/query-provider';
import { Toaster } from '@/ui/primitives/toast';
import { AuthProvider } from '@/shared/providers/auth-provider';
import { NuqsAdapter } from 'nuqs/adapters/next';

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
  title: {
    default: 'Commonly',
    template: '%s | Commonly',
  },
  description:
    "One question a day. Share your thoughts, read others' answers, and discover perspectives beyond your own.",
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full scroll-smooth',
        'antialiased',
        dmSans.variable,
        dmMono.variable,
        'font-sans',
      )}
    >
      <body className='text-primary flex min-h-full flex-col leading-[1.2]'>
        <NuqsAdapter>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
