import dayjs from "dayjs"
import { eq, lte } from "drizzle-orm"
import { NextResponse } from "next/server"
import * as z from "zod"
import { db } from "@/database/drizzle"
import { days, habits, habitWeekDays } from "@/database/schemas"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const dateParam = url.searchParams.get("date")
    const getDaySchema = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDaySchema.parse({ date: dateParam })

    const parsedDate = dayjs(date).startOf("day")
    const weekDay = dayjs(date).get("day")

    const possibleHabits = await db.query.habits.findMany({
      where: lte(habits.createdAt, date.toISOString()),
      with: {
        weekDays: {
          where: eq(habitWeekDays.weekDay, weekDay),
        },
      },
    })

    const day = await db.query.days.findFirst({
      where: eq(days.date, parsedDate.toISOString().split("T")[0]),
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
