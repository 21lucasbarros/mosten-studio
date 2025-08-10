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
      mutate();
      globalMutate("/api/votos/positivos");
      globalMutate("/api/votos/negativos");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-400 mt-20 text-lg">Carregando...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-400 mt-20 text-lg">
        Erro ao carregar filmes.
      </p>
    );

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filmes?.map((filme) => (
          <div
            key={filme._id}
            className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={filme.imagem}
              alt={filme.titulo}
              className="w-full h-64 object-cover object-center rounded-t-2xl"
            />
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1 truncate">
                {filme.titulo}
              </h2>
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {filme.genero}
              </span>
              {filme.descricao && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {filme.descricao}
                </p>
              )}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <button
                  className="flex items-center gap-1 p-2 text-green-600 hover:text-green-700 hover:scale-110 transition-all cursor-pointer"
                  onClick={() => votar(filme._id, "gostei")}
                  aria-label="Gostei"
                >
                  <ThumbsUp size={21} />
                  <span className="text-sm font-medium">{filme.gostei}</span>
                </button>
                <button
                  className="flex items-center gap-1 p-2 text-red-600 hover:text-red-700 hover:scale-110 transition-all cursor-pointer"
                  onClick={() => votar(filme._id, "naoGostei")}
                  aria-label="Não gostei"
                >
                  <ThumbsDown size={21} />
                  <span className="text-sm font-medium">{filme.naoGostei}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
