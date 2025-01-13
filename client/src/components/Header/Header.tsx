import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavbarMenu from "./NavbarMenu";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const closeSearch = () => setIsSearchOpen(false);
  const openSearch = () => setIsSearchOpen(true);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 flex items-center justify-between shadow-md gap-2 p-2 h-14 bg-background">
      {!isSearchOpen && (
        <Link to={"/"} className="mx-4">
          <img src="/logo.png" alt="Company Logo" className="h-10 w-10" />
        </Link>
      )}

      <SearchBar isSearchOpen={isSearchOpen} closeSearchOnBlur={closeSearch} />

      <NavbarMenu isSearchOpen={isSearchOpen} isMenuOpen={isMenuOpen} />

      {!isSearchOpen && (
        <div className="flex items-center gap-0.5">
          <button className="md:hidden px-4 py-2 rounded-full border-none hover:bg-btn-hover">
            <MagnifyingGlassIcon className="size-6" onClick={openSearch} />
          </button>

          <div>
            <button
              className="mr-4 px-2 py-1 bg-btn font-bold rounded-full hover:bg-btn-disabled transition-all duration-200"
              aria-label="Log in"
            >
              Log in
            </button>
          </div>

          <button
            className="md:hidden hover:bg-btn-hover px-4 py-2 rounded-full border-none -ml-4"
            onClick={toggleMenu}
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
