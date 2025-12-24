import { Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import StoreProvider from '@/app/StoreProvider';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: 'NineCart. - Shop smarter',
  description: 'NineCart. - Shop smarter',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${outfit.className} antialiased`}>
          <StoreProvider>
            <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
            {children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
