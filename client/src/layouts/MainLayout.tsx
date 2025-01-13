import React, { ReactNode } from "react";
import Header from "@/components/Header/Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full container">
      <Header />
      <main className="mt-14 py-2">{children}</main>
    </div>
  );
};

export default MainLayout;
