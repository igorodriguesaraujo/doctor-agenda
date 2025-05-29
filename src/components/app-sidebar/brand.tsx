import Image from "next/image";
import { SidebarHeader } from "../ui/sidebar";
import LogoDoctor from '@/assets/logo.svg';

export function Brand() {
  return (
    <SidebarHeader className="py-4 border-b border-gray-100">
      <Image
        src={LogoDoctor}
        width={136}
        height={27}
        alt="Logo" />
    </SidebarHeader>
  )
}