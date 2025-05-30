"use client"

import { LogOut, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";

import { SidebarFooter, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "../../../../components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SidebarProfile() {
  const router = useRouter();
  const session = authClient.useSession()



  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        }
      }
    })
  }

  return (
    <SidebarFooter>
      <SidebarMenu className="py-6">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <SidebarMenuItem className="hover:bg-transparent hover:text-muted-foreground">
              <Avatar>
                <AvatarFallback>
                  {session.data?.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <strong className="text-gray-600 font-bold">{session.data?.user.clinic.name}</strong>
                <span className="text-xs text-gray-400">{session.data?.user.email}</span>
              </div>
            </SidebarMenuItem>
          </SidebarMenuButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreVertical />
              </SidebarMenuAction>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}