import Image from "next/image";
import { SidebarHeader } from "../../../../components/ui/sidebar";

export function Brand() {
  return (
    <SidebarHeader className="py-4 border-b border-gray-100">
      <Image
        src="/logo.svg"
        width={136}
        height={27}
        alt="Logo" />
    </SidebarHeader>
  )
}