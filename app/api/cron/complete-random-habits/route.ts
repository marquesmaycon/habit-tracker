import { type NextRequest, NextResponse } from "next/server"

import { completeRandomHabits } from "@/database/complete-random-habits"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authorization = request.headers.get("authorization")

  if (cronSecret && authorization !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    if (Math.random() < 0.5) {
      return NextResponse.json({
        message: "Automacao diaria pulada aleatoriamente",
        result: {
          skippedReason: "random_skip",
        },
      })
    }

    const result = await completeRandomHabits()

    return NextResponse.json({
      message: "Automacao diaria executada",
      result,
    })
  } catch (error) {
    console.error("Erro ao concluir habitos aleatorios:", error)

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
