import Navbar from '@/components/Navbar/Navbar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl">
        <div className="m-5">{children}</div>
      </main>
    </>
  );
}
