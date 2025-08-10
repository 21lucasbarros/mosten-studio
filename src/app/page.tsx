import Header from "@/components/Header";
import ListaFilmes from "@/components/ListaFilmes";
import TotaisGerais from "@/components/TotaisGerais";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TotaisGerais />
      <ListaFilmes />
    </main>
  );
}
