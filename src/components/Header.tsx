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
    <>
      <header className="relative border-b border-slate-700/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Image
                src="/logo-mosten.svg"
                alt="Mosten Studio"
                width={180}
                height={180}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-200"
                priority
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 
               bg-orange-500 hover:bg-orange-600
               text-white font-medium text-sm md:text-base rounded-lg
               transition-colors duration-200"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline-block">Adicionar Conteúdo</span>
              <span className="sm:hidden">Adicionar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal moved outside header */}
      <ModalCadastro
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCadastro}
      />
    </>
  );
}
