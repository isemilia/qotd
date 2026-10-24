import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'bg-auth flex min-h-screen flex-col items-center justify-center'
      }
    >
      {children}
    </div>
  );
};

export default Layout;
