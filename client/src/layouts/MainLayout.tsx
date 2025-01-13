import Header from "@/components/Header/Header";
import ThemeToggle from "@/components/ThemeToggle";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mt-14">
        <ThemeToggle />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
