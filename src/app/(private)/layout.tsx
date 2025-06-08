import React from "react";

import { AppSidebar } from "@/app/(private)/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-gray-50">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}