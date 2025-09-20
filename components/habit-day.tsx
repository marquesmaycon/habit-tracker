"use client"

import dayjs from "dayjs"
import { useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { HabitsList } from "./habits-list"
import { ProgressBar } from "./progress-bar"

type HabitDayProps = {
  date: Date
  completeds?: number
  amount?: number
}

export function HabitDay({ completeds = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(completeds)
  const [currentAmount, setCurrentAmount] = useState(amount)

  const completedPercentage =
    currentAmount > 0 ? Math.round((completed / currentAmount) * 100) : 0

  // console.log({ completedPercentage })
  // console.log({ amount })

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  function handleCompletedChange(completed: number, amount?: number) {
    setCompleted(completed)
    if (amount !== undefined) {
      setCurrentAmount(amount)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
            {
              "bg-zinc-900 hover:bg-zinc-900/60 border-zinc-800":
                completedPercentage === 0,
              "bg-violet-900 hover:bg-violet-900/60 border-violet-800":
                completedPercentage > 0 && completedPercentage < 20,
              "bg-violet-800 hover:bg-violet-800/60 border-violet-700":
                completedPercentage >= 20 && completedPercentage < 40,
              "bg-violet-700 hover:bg-violet-700/60 border-violet-600":
                completedPercentage >= 40 && completedPercentage < 60,
              "bg-violet-600 hover:bg-violet-600/60 border-violet-500":
                completedPercentage >= 60 && completedPercentage < 80,
              "bg-violet-500 hover:bg-violet-500/60 border-violet-400":
                completedPercentage >= 80,
            },
          )}
        />
      </PopoverTrigger>

      <PopoverContent className="w-80 p-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
            <h3 className="font-extrabold leading-tight text-3xl">
              {dayAndMonth}
            </h3>
          </div>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
