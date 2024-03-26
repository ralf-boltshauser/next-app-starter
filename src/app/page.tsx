import Navbar from '@/components/Navbar/Navbar';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  return (
    <>
      <Navbar />
      <h1>Some fancy full screen Landing page with no margins</h1>
    </>
  );
}
