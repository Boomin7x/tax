"use client";

import { FC, ReactNode } from "react";
import AppSidebar from "./appSidebar";
import { SidebarInset } from "./ui/sidebar";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <main className="w-full">
        <SidebarInset className="w-full">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b w-full">
            <div className="flex items-center gap-2 px-3 w-full">
              <p className="text-xl uppercase font-bold">Location</p>
            </div>
          </header>
          {children}
        </SidebarInset>
      </main>
    </>
  );
};

export default MainLayout;
