'use client'

import Loading from '@/components/Loading';
import StoreLayout from '@/components/store/StoreLayout';
import {
  SignedIn,
  SignedOut,
  SignIn,
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs';

// export const metadata = {
//   title: 'NineCart. - Admin',
//   description: 'NineCart. - Admin',
// };

export default function RootAdminLayout({ children }) {
  return (
    <>
      <ClerkLoading>
        <div className='min-h-screen flex items-center justify-center'>
          <Loading />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <StoreLayout>{children}</StoreLayout>
        </SignedIn>

        <SignedOut>
          <div className='min-h-screen flex items-center justify-center'>
            <SignIn fallbackRedirectUrl='/store' routing='hash' />
          </div>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
