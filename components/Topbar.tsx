"use client";

import Image from "next/image";

export default function Topbar() {
  return (
    <header
      className="
        w-full
        flex
        items-center
        border-b border-gray-200
        bg-white
        px-6
        h-14
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="flex items-center gap-2 ml-auto md:ml-0">
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