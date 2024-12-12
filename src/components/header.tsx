'use client';

import { logout } from '@/app/actions/actions';
import {  sessionResults } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';  // Import useRouter
import { useEffect, useState } from 'react';

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/posts',
    label: 'My Posts',
  },
  {
    href: '/create-post',
    label: 'Create post',
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const  isLoggedIn = window.localStorage.getItem('loggedIn')

  const checkSession = async () => {
    try {
      const session = await sessionResults(); 
      if (session?.isAuth) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      setIsLoggedIn(false); 
    }
  };

  useEffect(() => {
    if (pathname != '/login' &&  pathname != '/signin'){
      checkSession(); 
    }

  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    // localStorage.clear()
    setIsLoggedIn(false); 
    
    router.push('/login'); 
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="Logo"
          className="w-[35px] h-[35px]"
          width="35"
          height="35"
        />
      </Link>

      {isLoggedIn && (
        <nav>
          <ul className="flex gap-x-5 text-[14px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {isLoggedIn ? (
        <button
        onClick={handleLogout}
          className="p-1 px-2 bg-white rounded-md text-black mx-2 text-sm border-black border-2 hover:bg-black hover:text-white"
        >
          Logout
        </button>
      ) : (
        <div>
          {pathname === '/signin' && (
            <Link href="/login">
              <button className="p-1 px-2 bg-white rounded-md text-black mx-2 text-sm border-black border-2 hover:bg-black hover:text-white">
                Login
              </button>
            </Link>
          )}

          {pathname === '/login' && (
            <Link href="/signin">
              <button className="p-1 px-2 bg-white rounded-md text-black text-sm border-black border-2 hover:bg-black hover:text-white">
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
