import { Surface } from '@/ui/primitives/surface';
import { SignInForm } from '@/features/auth/components/sign-in-form';

const Page = () => {
  return (
    <Surface className={'p-8 w-full max-w-126'}>
      <SignInForm />
    </Surface>
  );
};

export default Page;
