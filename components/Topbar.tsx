"use client";

import Image from "next/image";

interface TopbarProps {
  sidebarWidth?: number; // largura da sidebar em px (desktop)
}

export default function Topbar({ sidebarWidth = 256 }: TopbarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 md:left-auto flex items-center border-b border-gray-200 bg-white px-6 h-14 z-30 transition-all"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        width: sidebarWidth ? `100%` : undefined, // default para mobile
      }}
    >
      <div className="flex items-center gap-2 ml-auto">
        <Image
          src="/logomack.png"
          alt="Logo"
          width={28}
          height={28}
          priority
        />
      </div>
    </header>
  );
}