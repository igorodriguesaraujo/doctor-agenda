import React from "react";
import { Toaster } from "sonner";

import { AppSidebar } from "@/app/(private)/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <Toaster richColors theme="light" />
      </main>
    </SidebarProvider>
  )
}