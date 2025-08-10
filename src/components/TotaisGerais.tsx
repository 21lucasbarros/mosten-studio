"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TotaisGerais() {
  const { data: positivos } = useSWR<{ total: number }>(
    "/api/votos/positivos",
    fetcher
  );
  const { data: negativos } = useSWR<{ total: number }>(
    "/api/votos/negativos",
    fetcher
  );

  return (
    <section className="py-10 px-5 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Estatísticas Gerais
      </h2>
      <div className="flex flex-row sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-5">
        <div className="flex flex-row items-center gap-2">
          <ThumbsUp className="text-green-600" size={24} />
          <p className="text-sm sm:text-base">
            <span className="text-green-600">{positivos?.total ?? 0}</span>{" "}
            votos positivos
          </p>
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

        <div className="flex flex-row items-center gap-2">
          <ThumbsDown className="text-red-600" size={24} />
          <p className="text-sm sm:text-base">
            <span className="text-red-600">{negativos?.total ?? 0}</span> votos
            negativos
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-base md:text-lg font-semibold text-gray-700">
          Total de votos:
          <span className="ml-2">
            {(positivos?.total ?? 0) + (negativos?.total ?? 0)}
          </span>
        </p>
      </div>
    </section>
  );
}
