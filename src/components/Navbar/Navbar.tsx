import Link from 'next/link';
import MenuComponent from './Menu';

export default async function Navbar() {
  return (
    <div className="fixed left-0 top-0 z-10 w-full  bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-primary p-2 px-5">
        <Link href="/">
          <h1 className="text-xl font-bold text-primary">App Name</h1>
        </Link>
        <MenuComponent />
      </nav>
    </div>
  );
}
