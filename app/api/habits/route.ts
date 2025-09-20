import { NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/database/drizzle"
import { habits, habitWeekDays } from "@/database/schemas"

export async function POST(request: Request) {
  try {
    const habitSchema = z.object({
      title: z
        .string()
        .min(3, "O nome é obrigatório e deve ter ao menos 3 caracteres"),
      weekDays: z
        .array(z.number().int().min(0).max(6))
        .nonempty("É necessário informar ao menos um dia da semana"),
    })

    const body = await request.json()

    const { title, weekDays } = habitSchema.parse(body)

    const [habit] = await db.insert(habits).values({ title }).returning()

    if (habit) {
      await db
        .insert(habitWeekDays)
        .values(weekDays.map((weekDay) => ({ habitId: habit.id, weekDay })))
    }

    return NextResponse.json(
      {
        message: "Hábito criado com sucesso!",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao criar hábito:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 422 })
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
