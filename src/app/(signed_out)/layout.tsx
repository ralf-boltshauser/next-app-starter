import Navbar from '@/components/Navbar/Navbar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="relative z-0 mx-auto mt-24 max-w-6xl">
        <div className="m-5">{children}</div>
      </main>
    </>
  );
}
