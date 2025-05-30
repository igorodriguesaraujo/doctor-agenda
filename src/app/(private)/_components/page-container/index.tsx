"use client"

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function PageContainer({ children }: React.ComponentProps<'div'>) {
  return (
    <div className="flex flex-col w-full px-6 pt-8 pb-3">
      {children}
    </div>
  )
}

export function PageBreadCrumb() {
  const pathname = usePathname()
  return (
    <div className="pb-4">
      <ul className="flex items-center gap-2">
        <li className="text-sm font-semibold text-[#9CA7B2]">Menu principal</li>
        <li className="text-doc-primary"><ChevronRight size={14} /></li>
        <li className="text-sm font-semibold text-doc-primary">{pathname.replace('/', '')}</li>
      </ul>
    </div>
  )
}

export function PageHeader({ children }: React.ComponentProps<'header'>) {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      {children}
    </div>
  )
}

export function PageHeaderAction({ children }: React.ComponentProps<'div'>) {
  return (
    <div className="flex items-center gap-3">
      {children}
    </div>
  )
}

export function PageHeaderTitle({ children }: React.ComponentProps<'div'>) {
  return (
    <h2 className="text-[#0E0A2F] text-2xl font-bold">
      {children}
    </h2>
  )
}

export function PageHeaderDescription({ children }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div className="text-sm text-[#5B7189]">
      {children}
    </div>
  )
}
