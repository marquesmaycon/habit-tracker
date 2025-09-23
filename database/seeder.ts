import dayjs from "dayjs"

import { db } from "./drizzle"
import { dayHabits, days, habits, habitWeekDays } from "./schemas"

export const main = async () => {
  console.log("🔍 Verificando se já existem hábitos...")
  const hasHabits = await db.select().from(habits).limit(1)

  if (hasHabits.length) {
    console.log("Habits already seeded")
    return
  }

  const habitsData = [
    { title: "Exercitar-se", weekdays: [1, 3, 5] }, // Segunda, Quarta e Sexta
    { title: "Meditar", weekdays: [0, 6] }, // Domingo e Sábado
    { title: "Estudar", weekdays: [2, 4] }, // Terça e Quinta
  ]

  const creationDate = dayjs("2025-01-01")

  const insertedHabits = await db
    .insert(habits)
    .values(
      habitsData.map((habit) => ({
        title: habit.title,
        createdAt: creationDate.format("YYYY-MM-DD HH:mm:ss"),
      })),
    )
    .returning()

  const habitWeekDaysData = insertedHabits.flatMap((habit, index) =>
    habitsData[index].weekdays.map((weekday) => ({
      habitId: habit.id,
      weekDay: weekday,
    })),
  )
  await db.insert(habitWeekDays).values(habitWeekDaysData)

  const today = dayjs()

  // Primeiro, vamos gerar todas as datas únicas que precisamos
  const allDates = new Set<string>()
  const dayHabitsToCreate: { habitId: number; date: string }[] = []

  habitWeekDaysData.forEach(({ habitId, weekDay }) => {
    let currentDate = creationDate

    while (currentDate.isBefore(today)) {
      if (currentDate.day() === weekDay) {
        if (Math.random() > 0.5) {
          const dateStr = currentDate.format("YYYY-MM-DD")
          allDates.add(dateStr)
          dayHabitsToCreate.push({
            habitId,
            date: dateStr,
          })
        }
      }
      currentDate = currentDate.add(1, "day")
    }
  })

  const uniqueDatesArray = Array.from(allDates)
  const insertedDays = await db
    .insert(days)
    .values(uniqueDatesArray.map((date) => ({ date })))
    .returning()

  const dateToIdMap = new Map(insertedDays.map((day) => [day.date, day.id]))

  const dayHabitsData = dayHabitsToCreate
    .map(({ habitId, date }) => {
      const dayId = dateToIdMap.get(date)
      return dayId ? { habitId, dayId } : null
    })
    .filter((item): item is { habitId: number; dayId: number } => item !== null)

  await db.insert(dayHabits).values(dayHabitsData)

  console.log("✅ Seeder executado com sucesso!")
  console.log(`📊 Criados ${insertedHabits.length} hábitos`)
  console.log(`📅 Criados ${insertedDays.length} dias únicos`)
  console.log(`📋 Criados ${dayHabitsData.length} registros de day_habits`)
}

if (require.main === module) {
  // Executar o seeder se chamado diretamente
  console.log("🌱 Iniciando seeder...")
  main()
    .then(() => {
      console.log("🎉 Processo concluído!")
      process.exit(0)
    })
    .catch((error) => {
      console.error("❌ Erro ao executar seeder:", error)
      process.exit(1)
    })
}
