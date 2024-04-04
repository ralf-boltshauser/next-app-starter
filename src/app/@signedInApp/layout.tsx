import SharedLayout from '@/components/shared/shared-layout';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SharedLayout>{children}</SharedLayout>;
}
