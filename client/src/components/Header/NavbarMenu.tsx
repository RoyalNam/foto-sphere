import React from "react";
import { Link, useLocation } from "react-router-dom";

type MenuItem = {
  id: string;
  label: string;
  path: string;
};

type NavbarMenuProps = {
  isSearchOpen: boolean;
  isMenuOpen: boolean;
};

const menuItems: MenuItem[] = [
  { id: "photos", label: "Photos", path: "/" },
  { id: "collections", label: "Collections", path: "/collections" },
  { id: "topics", label: "Topics", path: "/topics" },
];

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  isSearchOpen,
  isMenuOpen,
}) => {
  const location = useLocation();

  const renderDesktopMenu = () => (
    <nav>
      <ul
        className={`hidden md:flex mx-4 gap-2 ${
          isSearchOpen ? "hidden" : "block"
        }`}
      >
        {menuItems.map((item) => {
          const isActive =
            (item.path === "/" && location.pathname === "/") ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`px-4 py-2 hover:bg-btn rounded-full ${
                  isActive ? "bg-btn" : ""
                }`}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const renderMobileMenu = () => (
    <nav
      className={`absolute top-full right-0 w-96 bg-background-alt shadow-md ${
        isMenuOpen ? "block" : "hidden"
      } md:hidden`}
    >
      <ul className="flex flex-col gap-2 px-2 py-2">
        {menuItems.map((item) => {
          const isActive =
            (item.path === "/" && location.pathname === "/") ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`px-4 py-2 block hover:bg-btn rounded ${
                  isActive ? "bg-btn" : ""
                }`}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {renderDesktopMenu()}
      {renderMobileMenu()}
    </>
  );
};

export default NavbarMenu;
