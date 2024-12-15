"use client";

import { logout } from "@/app/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import BlogImg from "../../public/blogger.svg";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "My Posts",
  },
  {
    href: "/create-post",
    label: "Create post",
  },
];

export default function Header() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    redirect("/login");
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          src={BlogImg}
          alt="Logo"
          className="w-[35px] h-[35px]"
          width="35"
          height="35"
        />
      </Link>

      {pathname !== "/signup" && pathname !== "/login" && (
        <nav>
          <ul className="flex gap-x-5 text-[14px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href ? "text-zinc-900" : "text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {pathname !== "/signup" && pathname !== "/login" ? (
        <button
          onClick={handleLogout}
          className="p-1 px-2 bg-white rounded-md text-black mx-2 text-sm border-black border-2 hover:bg-black hover:text-white"
        >
          Logout
        </button>
      ) : (
        <div>
          {pathname === "/signup" && (
            <Link href="/login">
              <button className="p-1 px-2 bg-white rounded-md text-black mx-2 text-sm border-black border-2 hover:bg-black hover:text-white">
                Login
              </button>
            </Link>
          )}

          {pathname === "/login" && (
            <Link href="/signup">
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
