import { and, eq, lte } from "drizzle-orm"

import { dayjs } from "@/lib/dayjs"

import { db } from "./drizzle"
import { dayHabits, days, habits, habitWeekDays } from "./schemas"

type CompleteRandomHabitsOptions = {
  date?: string
}

type CompleteRandomHabitsResult = {
  date: string
  possibleHabits: number
  alreadyCompleted: number
  created: number
  selectedHabitIds: number[]
  skippedReason?: "no_possible_habits" | "already_has_completions"
}

const shuffle = <T>(items: T[]) => {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffled[index]

    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = currentItem
  }

  return shuffled
}

export async function completeRandomHabits({
  date,
}: CompleteRandomHabitsOptions = {}): Promise<CompleteRandomHabitsResult> {
  const targetDate = date
    ? dayjs.tz(date, "America/Sao_Paulo")
    : dayjs().tz("America/Sao_Paulo")

  const dateString = targetDate.format("YYYY-MM-DD")
  const weekDay = targetDate.day()

  const possibleHabits = await db
    .select({ id: habits.id })
    .from(habits)
    .innerJoin(habitWeekDays, eq(habitWeekDays.habitId, habits.id))
    .where(
      and(
        eq(habitWeekDays.weekDay, weekDay),
        lte(habits.createdAt, targetDate.endOf("day").toDate()),
      ),
    )

  if (!possibleHabits.length) {
    return {
      date: dateString,
      possibleHabits: 0,
      alreadyCompleted: 0,
      created: 0,
      selectedHabitIds: [],
      skippedReason: "no_possible_habits",
    }
  }

  let day = await db.query.days.findFirst({
    where: eq(days.date, dateString),
    with: { dayHabits: true },
  })

  if (day?.dayHabits.length) {
    return {
      date: dateString,
      possibleHabits: possibleHabits.length,
      alreadyCompleted: day.dayHabits.length,
      created: 0,
      selectedHabitIds: [],
      skippedReason: "already_has_completions",
    }
  }

  if (!day) {
    const [newDay] = await db
      .insert(days)
      .values({ date: dateString })
      .onConflictDoNothing()
      .returning()

    day = newDay
      ? { ...newDay, dayHabits: [] }
      : await db.query.days.findFirst({
          where: eq(days.date, dateString),
          with: { dayHabits: true },
        })
  }

  if (!day) {
    throw new Error(`Could not create or find day ${dateString}`)
  }

  const completionsToCreate =
    Math.floor(Math.random() * possibleHabits.length) + 1
  const selectedHabitIds = shuffle(
    possibleHabits.map((habit) => habit.id),
  ).slice(0, completionsToCreate)

  await db
    .insert(dayHabits)
    .values(selectedHabitIds.map((habitId) => ({ dayId: day.id, habitId })))
    .onConflictDoNothing()

  return {
    date: dateString,
    possibleHabits: possibleHabits.length,
    alreadyCompleted: 0,
    created: selectedHabitIds.length,
    selectedHabitIds,
  }
}
