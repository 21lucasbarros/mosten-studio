import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Filme from "@/models/Filme";

export async function GET() {
  await connectDB();
  const filmes = await Filme.find();
  return NextResponse.json(filmes);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const novoFilme = await Filme.create(body);
  return NextResponse.json(novoFilme, { status: 201 });
}
