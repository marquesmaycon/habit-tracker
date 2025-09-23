import { eq, lte } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/database/drizzle"
import { days, habits } from "@/database/schemas"

export async function GET(request: NextRequest) {
  try {
    const dateParam = request.nextUrl.searchParams.get("date")
    const getDaySchema = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDaySchema.parse({ date: dateParam })
    const parsedDate = date.toISOString().slice(0, 10) // "YYYY-MM-DD"

    const habitRecords = await db.query.habits.findMany({
      where: lte(habits.createdAt, date),
      with: {
        weekDays: true,
      },
    })

    const weekDay = date.getUTCDay()

    const possibleHabits = habitRecords.filter((habit) =>
      habit.weekDays.some((wd) => wd.weekDay === weekDay),
    )

    const day = await db.query.days.findFirst({
      where: eq(days.date, parsedDate),
      with: {
        dayHabits: true,
      },
    })

    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habitId) ?? []

    return NextResponse.json({
      possibleHabits: possibleHabits,
      completedHabits,
    })
  } catch (error) {
    console.error("Erro ao buscar dados do dia:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 422 })
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
