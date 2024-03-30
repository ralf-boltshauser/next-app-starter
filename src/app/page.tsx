import LandingPageComponent from '@/components/landing/LandingPageComponent';
import Navbar from '@/components/Navbar/Navbar';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  return (
    <main className=" min-h-screen">
      <Navbar />
      <div className=" min-h-screen w-full">
        <div className="mx-auto max-w-6xl ">
          <LandingPageComponent />
        </div>
      </div>
    </main>
  );
}
