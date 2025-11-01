import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import { PokemonData } from "@/app/lib/database";


export async function GET() {
  try {
    const favorites: PokemonData[] = await db.getAll();
    // Retornamos la lista de favoritos como JSON
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la lista de favoritos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener favoritos" },
      { status: 500 }
    );
  }
}

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