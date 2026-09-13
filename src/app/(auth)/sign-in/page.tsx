import { Surface } from '@/ui/primitives/surface';
import { SignInForm } from '@/features/auth/components/sign-in-form';

const Page = () => {
  return (
    <Surface className={'p-8 w-full max-w-126 max-md:px-5'}>
      <SignInForm />
    </Surface>
  );
};

export default Page;
