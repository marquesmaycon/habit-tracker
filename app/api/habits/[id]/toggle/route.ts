import { and, eq } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/database/drizzle"
import { dayHabits, days } from "@/database/schemas"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dateParam = searchParams.get("date")

    const toggleHabitParams = z.object({
      id: z.string().pipe(z.coerce.number()),
      date: z.coerce.date(),
    })

    const { id, date } = toggleHabitParams.parse({
      id: (await params).id,
      date: dateParam,
    })

    const isoDate = date.toISOString().slice(0, 10)

    let day = await db.query.days.findFirst({
      where: eq(days.date, isoDate),
    })

    if (!day) {
      const [newDay] = await db
        .insert(days)
        .values({ date: isoDate })
        .returning()
      day = newDay
    }

    const dayHabit = await db.query.dayHabits.findFirst({
      where: and(eq(dayHabits.dayId, day.id), eq(dayHabits.habitId, id)),
    })

    if (dayHabit) {
      await db.delete(dayHabits).where(eq(dayHabits.id, dayHabit.id))
    } else {
      await db.insert(dayHabits).values({ dayId: day.id, habitId: id })
    }

    return NextResponse.json({
      message: !dayHabit
        ? "Hábito marcado como completo!"
        : "Hábito desmarcado!",
      completed: true,
    })
  } catch (error) {
    console.error("Erro ao alternar hábito:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 422 })
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
