import Link from 'next/link';
import MenuComponent from './Menu';

export default async function Navbar() {
  return (
    <div className="fixed left-0 top-0 z-10 w-full bg-white shadow-md ">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <Link href="/">
          <h1 className="text-2xl font-bold">App Name</h1>
        </Link>
        <MenuComponent />
      </nav>
    </div>
  );
}
