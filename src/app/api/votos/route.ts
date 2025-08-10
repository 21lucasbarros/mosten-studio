import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Filme from "@/models/Filme";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { tipo } = await req.json();
  const { id } = await context.params;

  if (!["gostei", "naoGostei"].includes(tipo)) {
    return NextResponse.json({ error: "Tipo invalido" }, { status: 400 });
  }

  const filme = await Filme.findById(id);
  if (!filme) {
    return NextResponse.json(
      { error: "Filme não encontrado" },
      { status: 404 }
    );
  }

  filme[tipo] += 1;
  await filme.save();

  return NextResponse.json(filme);
}
