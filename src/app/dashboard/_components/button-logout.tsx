"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface ButtonLogoutProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
}

export function ButtonLogout({ children }: ButtonLogoutProps) {
  const router = useRouter();

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        }
      }
    })
  }

  return (
    <Button
      size="sm"
      variant='primary'
      onClick={handleClick}>
      {children}
    </Button>
  )
}