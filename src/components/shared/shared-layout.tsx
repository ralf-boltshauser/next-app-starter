import Navbar from '@/components/Navbar/Navbar';

export default async function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="relative z-0 mx-auto my-20 max-w-ultra-wide">
        <div className="m-5">{children}</div>
      </main>
    </>
  );
}
