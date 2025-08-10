"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import useSWR, { mutate as globalMutate } from "swr";

interface Filme {
  _id: string;
  titulo: string;
  genero: string;
  descricao?: string;
  imagem: string;
  gostei: number;
  naoGostei: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListaFilmes() {
  const {
    data: filmes,
    error,
    isLoading,
    mutate,
  } = useSWR<Filme[]>("/api/filmes", fetcher);

  const votar = async (id: string, tipo: "gostei" | "naoGostei") => {
    try {
      await fetch(`/api/filmes/${id}/voto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      });

      // Atualiza a lista de filmes
      mutate();

      // Atualiza também os totais gerais
      globalMutate("/api/votos/positivos");
      globalMutate("/api/votos/negativos");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar filmes.</p>;

  return (
    <div className="grid grid-cols-3 gap-6 px-20 py-10">
      {filmes?.map((filme) => (
        <div
          key={filme._id}
          className="bg-white rounded-lg shadow-md overflow-hidden border"
        >
          <img
            src={filme.imagem}
            alt={filme.titulo}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{filme.titulo}</h2>
            <p className="text-sm text-gray-500">{filme.genero}</p>
            {filme.descricao && (
              <p className="mt-2 text-gray-700 text-sm">{filme.descricao}</p>
            )}
            <div className="flex justify-between mt-4">
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => votar(filme._id, "gostei")}
              >
                <ThumbsUp className="w-5 h-5 text-green-500" />
                {filme.gostei}
              </button>
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => votar(filme._id, "naoGostei")}
              >
                <ThumbsDown className="w-5 h-5 text-red-500" />
                {filme.naoGostei}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
