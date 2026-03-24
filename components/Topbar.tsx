"use client";

import Image from "next/image";

export default function Topbar() {
  return (
    <header
      className="
        h-14
        w-full
        flex
        items-center
        border-b
        border-gray-200
        bg-white
        px-6
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* Substitua por sua logo real */}
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