import ThemeToggle from "@/components/ThemeToggle";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <ThemeToggle />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
