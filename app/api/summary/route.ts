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
    const result = await db.execute(sql`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            CAST(count(*) AS FLOAT)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            CAST(count(*) AS FLOAT)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = EXTRACT(DOW FROM D.date::date)
            AND TO_DATE(H.created_at, 'YYYY-MM-DD') <= D.date::date
        ) as amount
      FROM days D
    `)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao gerar summary:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
