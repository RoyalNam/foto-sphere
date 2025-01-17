import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="w-full container">
      <Header />
      <main className="mt-14 py-2">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
