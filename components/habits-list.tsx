"use client"

import dayjs from "dayjs"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

type Habit = {
  id: number
  title: string
  createdAt: string
}

type HabitsInfo = {
  possibleHabits: Habit[]
  completedHabits: number[]
}

type Props = {
  date: Date
  onCompletedChange: (completed: number, amount?: number) => void
}

export function HabitsList({ date, onCompletedChange }: Props) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(
          `/api/day?date=${date.toISOString().split("T")[0]}`,
        )
        const data: HabitsInfo = await response.json()
        setHabitsInfo(data)
        setLoading(false)
      } catch (error) {
        console.error("Erro ao carregar hábitos:", error)
        setLoading(false)
      }
    }

    fetchHabits()
  }, [date])

  async function handleToggleHabit(habitId: number) {
    try {
      await fetch(
        `/api/habits/${habitId}/toggle?date=${date.toISOString().split("T")[0]}`,
        {
          method: "PATCH",
        },
      )

      if (!habitsInfo) return

      const isHabitCompleted = habitsInfo.completedHabits.includes(habitId)

      let completedHabits: number[] = []

      if (isHabitCompleted) {
        completedHabits = habitsInfo.completedHabits.filter(
          (id) => id !== habitId,
        )
      } else {
        completedHabits = [...habitsInfo.completedHabits, habitId]
      }

      setHabitsInfo({
        possibleHabits: habitsInfo.possibleHabits,
        completedHabits,
      })

      onCompletedChange(completedHabits.length, habitsInfo.possibleHabits.length)
    } catch (error) {
      console.error("Erro ao alternar hábito:", error)
    }
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date())

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <span className="text-zinc-400 text-sm">
          <Loader2 className="size-6 mr-2 inline-block animate-spin" />
          Carregando hábitos...
        </span>
      </div>
    )
  }

  if (!habitsInfo?.possibleHabits.length) {
    return (
      <div className="mt-6 text-zinc-400 text-center text-sm">
        Nenhum hábito para este dia.
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo.possibleHabits.map((habit) => (
        <div
          key={habit.id}
          className="flex items-center gap-3 group focus-within:outline-none"
        >
          <Checkbox
            id={`habit-${habit.id}`}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            // disabled={isDateInPast}
            className="h-8 w-8 rounded-lg border-2 border-zinc-800 bg-zinc-900 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          />
          <label
            htmlFor={`habit-${habit.id}`}
            className={`font-semibold text-xl leading-tight cursor-pointer transition-all ${
              habitsInfo.completedHabits.includes(habit.id)
                ? "line-through text-zinc-400"
                : "text-white"
            } ${isDateInPast ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {habit.title}
          </label>
        </div>
      ))}
    </div>
  )
}
