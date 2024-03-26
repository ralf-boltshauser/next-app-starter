import Navbar from '@/components/Navbar/Navbar';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl">
          <div className="m-5">
            <h2 className="text-2xl font-bold">Not Found</h2>
            <p>You reached a page we currently don&apos;t know about!</p>
          </div>
        </main>
      </body>
    </html>
  );
}
