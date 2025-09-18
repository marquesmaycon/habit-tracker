"use client"

import dayjs from "dayjs"
import { useEffect, useState } from "react"

import type { Summary } from "@/app/api/summary/route"
import { generateDates } from "@/lib/utils"

import { HabitDay } from "./habit-day"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

const summaryDates = generateDates()

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => res.json())
      .then((data: Summary[]) => {
        setSummary(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Erro ao carregar summary:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3 pb-4">
        {weekDays.map((weekDay) => {
          return (
            <div
              key={weekDay}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll pb-2">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day")
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                completeds={dayInSummary?.completed}
              />
            )
          })}
      </div>
    </div>
  )
}
