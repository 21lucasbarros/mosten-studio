"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ModalCadastro from "./ui/ModalCadastro";
import { mutate } from "swr";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCadastro = async (data: {
    titulo: string;
    genero: string;
    imagem: string;
    descricao?: string;
  }) => {
    try {
      const res = await fetch("/api/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar filme");
      }

      const filmeCriado = await res.json();
      console.log("✅ Filme cadastrado:", filmeCriado);

      mutate("/api/filmes");

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="px-20 py-6 flex flex-row items-center justify-between border-b border-[#010101]">
      <Image src="/logo-mosten.svg" alt="Logo" width={180} height={180} />

      <button
        className="bg-[#ff4f0f] text-white px-4 py-2 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105 flex flex-row items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus height={16} width={16} />
        Adicionar Filme / Série
      </button>

      {isModalOpen && (
        <ModalCadastro
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCadastro}
        />
      )}
    </header>
  );
}
