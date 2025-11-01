import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones
    if (!body.name) {
      return NextResponse.json(
        { error: "Falta campo obligatorio: name" },
        { status: 400 }
      );
    }

    const newFavorite = await db.create({
      name: body.name,
      url: body.spriteUrl || "",
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al agregar el pokemon" },
      { status: 500 }
    );
  }
}