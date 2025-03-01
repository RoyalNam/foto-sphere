import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavbarMenu from "./NavbarMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const closeSearch = () => setIsSearchOpen(false);
  const openSearch = () => setIsSearchOpen(true);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  const closeMenuOpen = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-md bg-background">
      <div className="container flex items-center justify-between gap-2 p-2 h-14">
        {!isSearchOpen && (
          <Link to={"/"} className="ml-2 mr-4">
            <img src="/logo.png" alt="Company Logo" className="w-10 h-10" />
          </Link>
        )}

        <SearchBar
          isSearchOpen={isSearchOpen}
          closeSearchOnBlur={closeSearch}
        />

        <NavbarMenu
          isSearchOpen={isSearchOpen}
          isMenuOpen={isMenuOpen}
          closeMenuOpen={closeMenuOpen}
        />

        {!isSearchOpen && (
          <div className="flex items-center gap-0.5">
            <button
              className="px-4 py-2 border-none rounded-full md:hidden hover:bg-btn-hover"
              title="Search"
            >
              <MagnifyingGlassIcon className="size-6" onClick={openSearch} />
            </button>

            <ThemeToggle />

            <div>
              <button
                className="px-2 py-1 mr-4 font-bold transition-all duration-200 rounded-full bg-btn hover:bg-btn-disabled"
                aria-label="Log in"
              >
                Log in
              </button>
            </div>

            <button
              className="px-4 py-2 -ml-4 border-none rounded-full md:hidden hover:bg-btn-hover"
              onClick={toggleMenu}
              title="Menu"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
