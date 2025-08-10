import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Filme from "@/models/Filme";

export async function GET() {
  await connectDB();
  const total = await Filme.aggregate([
    { $group: { _id: null, total: { $sum: "$gostei" } } },
  ]);
  return NextResponse.json({ total: total[0]?.total || 0 });
}
