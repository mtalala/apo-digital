"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function NewRequestFab() {
  return (
    <Link
      href="/solicitacoes"
      aria-label="Criar nova solicitação"
      className="
        fixed
        bottom-6
        right-6
        z-30
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-red-600
        text-white
        shadow-lg
        transition
        hover:bg-red-600/90
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:ring-offset-2
      "
    >
      <Plus className="h-6 w-6 text-white" />
    </Link>
  );
}