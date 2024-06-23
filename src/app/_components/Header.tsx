"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const currentPath = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActiveLink = (href: string) => (currentPath === href ? "text-red-600" : "text-black");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white text-black shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        <Link href="/">
          <Image src={Logo} alt="Logo" />
        </Link>
        <div className="flex items-center justify-center gap-4 xl:gap-4 2xl:gap-8">
          <div className="hidden items-center justify-center gap-4 xl:flex xl:gap-5 2xl:gap-8">
            <Link href="/" className={`py-2 text-center font-semibold ${isActiveLink("/")} hover:text-red-500 `}>
              Menüpont
            </Link>
            <Link
              href="/articles"
              className={`py-2 text-center font-semibold ${isActiveLink("/articles")} hover:text-red-500 `}
            >
              Blog
            </Link>
          </div>

          <div className="xl:hidden">
            <div className="relative inline-block text-left" ref={menuRef}>
              <div>
                <button
                  aria-label="Open menu"
                  className="aspect-square h-[42px] rounded-full bg-primary-600 text-white"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    aria-hidden="true"
                    className="mx-auto h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <div className="flex flex-col items-stretch gap-1 px-1 py-1" role="none">
                    <Link
                      href="/"
                      className={`inline-flex items-center rounded focus:outline-none focus-visible:ring focus-visible:ring-primary-500 shadow-sm transition-colors duration-75 px-8 text-sm md:text-base border border-primary-600 hover:bg-red-500 hover:text-white active:bg-primary-800 disabled:bg-primary-400 disabled:cursor-not-allowed bg-lightBg py-2 font-semibold ${isActiveLink(
                        "/"
                      )}`}
                      onClick={closeMenu}
                    >
                      Menüpont
                    </Link>
                    <Link
                      href="/articles"
                      className={`inline-flex items-center rounded focus:outline-none focus-visible:ring focus-visible:ring-primary-500 shadow-sm transition-colors duration-75 px-8 text-sm md:text-base border border-primary-600 hover:bg-red-500 hover:text-white active:bg-primary-800 disabled:bg-primary-400 disabled:cursor-not-allowed bg-lightBg py-2 font-semibold ${isActiveLink(
                        "/articles"
                      )}`}
                      onClick={closeMenu}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
