import NextAuthProvider from '@/components/auth/NextAuthProvider';
import { getBootstrapData } from '@/components/posthog/PostHog';
import { PHProvider } from '@/components/posthog/Providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posthogBootstrapData = await getBootstrapData();

  return (
    <html lang="en">
      <PHProvider bootstrapData={posthogBootstrapData}>
        <body className={inter.className}>
          <PostHogPageView />
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster />
        </body>
      </PHProvider>
    </html>
  );
}
