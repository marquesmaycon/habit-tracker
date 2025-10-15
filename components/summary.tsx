"use client"

import { useEffect, useRef, useState } from "react"
import type { Summary } from "@/app/api/summary/route"
import { dayjs } from "@/lib/dayjs"
import { generateDates } from "@/lib/utils"

import { HabitDay } from "./habit-day"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

const summaryDates = generateDates()

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [loading])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3 pb-4 pt-2">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={weekDay + i.toString()}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div
        className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll p-2 px-4 [mask-image:linear-gradient(to_right,transparent,black_2.5%,black_97.5%,transparent)]"
        ref={scrollRef}
      >
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
