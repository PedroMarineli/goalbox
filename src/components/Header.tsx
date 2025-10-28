'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          GoalBox
        </Link>
        <nav>
          <Link href="/products" className="mr-4">
            Chuteiras
          </Link>
          <Link href="/subscription" className="mr-4">
            Assinatura
          </Link>
          <Link href="/cart" className="mr-4">
            Carrinho
          </Link>
          {session ? (
            <>
              <span className="mr-4">Olá, {session.user?.name}</span>
              <button onClick={() => signOut()} className="hover:underline">
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
