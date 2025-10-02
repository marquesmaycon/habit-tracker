import { eq, lte, sql } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { db } from "@/database/drizzle"
import { days, habits } from "@/database/schemas"
import { dayjs } from "@/lib/dayjs"

export async function GET(request: NextRequest) {
  try {
    const dateParam = request.nextUrl.searchParams.get("date")

    const getDaySchema = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDaySchema.parse({ date: dateParam })

    const parsedDate = dayjs.utc(date).set("hour", 23).set("minute", 59).set("second", 59)

    const habitRecords = await db.query.habits.findMany({
      where: lte(
        habits.createdAt,
        parsedDate.toDate()
      ),
      with: { weekDays: true },
    })

    const weekDay = parsedDate.toDate().getDay()

    const possibleHabits = habitRecords.filter((habit) =>
      habit.weekDays.some((wd) => wd.weekDay === weekDay),
    )

    const day = await db.query.days.findFirst({
      where: eq(days.date, parsedDate.format("YYYY-MM-DD")),
      with: { dayHabits: true },
    })

    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habitId) ?? []

    return NextResponse.json({
      possibleHabits,
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
