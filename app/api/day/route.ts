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

    // busca hábitos criados até o fim do dia (UTC)
    // Gera o SQL da query para debug
    const sqlQuery = db
      .select()
      .from(habits)
      .where(lte(habits.createdAt, dayjs(date).endOf("day").toDate()))
      .toSQL()

    console.log("SQL gerado:", sqlQuery.sql, sqlQuery.params)

    const habitRecords = await db.query.habits.findMany({
      where: lte(habits.createdAt, dayjs(date).startOf("day").toDate()),
      with: { weekDays: true },
    })

    console.log({ habitRecords })

    // dia da semana correto no fuso BR
    const weekDay = dayjs(date).tz("America/Sao_Paulo").day()
    // domingo=0, segunda=1...

    const possibleHabits = habitRecords.filter((habit) =>
      habit.weekDays.some((wd) => wd.weekDay === weekDay),
    )

    // data BR formatada "YYYY-MM-DD"
    const parsedDate = dayjs(date).tz("America/Sao_Paulo").format("YYYY-MM-DD")

    const day = await db.query.days.findFirst({
      where: eq(days.date, parsedDate),
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
