import { Surface } from '@/ui/primitives/surface';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create an account to answer daily questions and explore other perspectives',
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return (
    <Surface className={'w-full max-w-126 p-8 max-md:px-5'}>
      <SignUpForm />
    </Surface>
  );
};

export default Page;
