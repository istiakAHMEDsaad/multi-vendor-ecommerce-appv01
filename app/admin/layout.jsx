'use client'

import AdminLayout from '@/components/admin/AdminLayout';
import Loading from '@/components/Loading';
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
          <AdminLayout>{children}</AdminLayout>
        </SignedIn>

        <SignedOut>
          <div className='min-h-screen flex items-center justify-center'>
            <SignIn fallbackRedirectUrl='/admin' routing='hash' />
          </div>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
