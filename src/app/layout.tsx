import NextAuthProvider from '@/components/auth/NextAuthProvider';
import { getBootstrapData } from '@/components/posthog/PostHog';
import { PHProvider } from '@/components/posthog/Providers';
import { Toaster } from '@/components/ui/sonner';
import { authOptions } from '@/lib/auth';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// prevents rendering on the server
const PostHogPageView = dynamic(
  () => import('../components/posthog/PosthogPageView'),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: 'Ralfs App Starter',
  description: 'Ralfs NextJs App Starter',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icons/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/icons/site.webmanifest',
    },
  ],
};

export default async function RootLayout({
  children,
  signedInApp,
  modal,
}: Readonly<{
  children: React.ReactNode;
  signedInApp: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const posthogBootstrapData = await getBootstrapData();

  const session = await getServerSession(authOptions);

  const signedIn = session?.user ? true : false;

  return (
    <html lang="en">
      <PHProvider bootstrapData={posthogBootstrapData}>
        <body className={inter.className}>
          <PostHogPageView />
          <NextAuthProvider>
            {signedIn ? signedInApp : children}
            {modal}
          </NextAuthProvider>
          <Toaster />
        </body>
      </PHProvider>
    </html>
  );
}
