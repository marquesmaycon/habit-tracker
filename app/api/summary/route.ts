import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

import { db } from "@/database/drizzle"

export type Summary = {
  id: number
  date: string // "2025-08-25"
  amount: number
  completed: number
}

export async function GET() {
  try {
    const summary: Summary[] = db.all(sql`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `)

    return NextResponse.json(summary)
  } catch (error) {
    console.error("Erro ao gerar summary:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
