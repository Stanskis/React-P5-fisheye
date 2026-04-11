'use client';
import Logo from '../svg/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="w-4/5 mx-auto py-8">
      <div className="flex sm:flex-row sm:justify-between sm:items-center">
        <Link href="/" aria-label="Retour à l'accueil">
          <Logo />
        </Link>

        <h1 className={!isHomePage ? 'invisible' : 'text-4xl primaire-text'}>
          Nos photographes
        </h1>
      </div>
    </header>
  );
}
