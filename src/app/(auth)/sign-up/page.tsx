import { Surface } from '@/ui/primitives/surface';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

const Page = () => {
  return (
    <Surface className={'p-8 w-full max-w-126'}>
      <SignUpForm />
    </Surface>
  );
};

export default Page;
