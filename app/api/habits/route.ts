import { NextResponse } from "next/server";
import * as z from "zod";

export async function POST(request: Request) {
  try {
    const habitSchema = z.object({
      name: z
        .string()
        .min(3, "O nome é obrigatório e deve ter ao menos 3 caracteres"),
      weekDays: z
        .array(z.number().int().min(0).max(6))
        .nonempty("É necessário informar ao menos um dia da semana"),
    });

    const body = await request.json();

    const validatedData = habitSchema.parse(body);

    console.log("Dados validados:", validatedData);

    return NextResponse.json(
      { message: "Hábito criado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error }, { status: 422 });
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
