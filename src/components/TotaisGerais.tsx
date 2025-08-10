"use client";

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
    <div className="px-20 py-4 bg-gray-100 flex justify-center gap-8 text-lg font-bold">
      <span className="text-green-600">
        👍 {positivos?.total ?? 0} votos positivos
      </span>
      <span className="text-red-600">
        👎 {negativos?.total ?? 0} votos negativos
      </span>
    </div>
  );
}
