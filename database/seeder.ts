import dayjs from "dayjs";

import { db } from "./drizzle";
import { habitDays, habits, habitWeekdays } from "./schemas";

export const main = async () => {
  const hasHabits = await db.select().from(habits).limit(1);

  if (hasHabits.length) {
    console.log("Habits already seeded");
    return;
  }

  const habitsData = [
    { name: "Beber 3L de água", weekdays: [1, 2, 3, 4, 5] }, // Segunda a Sexta
    { name: "Exercitar-se", weekdays: [1, 3, 5] }, // Segunda, Quarta e Sexta
    { name: "Meditar", weekdays: [0, 6] }, // Domingo e Sábado
    { name: "Estudar", weekdays: [1, 2, 3, 4, 5] }, // Segunda a Sexta
  ];

  const creationDate = dayjs("2025-01-01");

  const insertedHabits = await db
    .insert(habits)
    .values(
      habitsData.map((habit) => ({
        name: habit.name,
        createdAt: creationDate.format("YYYY-MM-DD HH:mm:ss"),
      })),
    )
    .returning();

  const habitWeekdaysData = insertedHabits.flatMap((habit, index) =>
    habitsData[index].weekdays.map((weekday) => ({
      habitId: habit.id,
      weekday,
    })),
  );
  await db.insert(habitWeekdays).values(habitWeekdaysData);

  const today = dayjs();
  const dayHabitsData = habitWeekdaysData.flatMap(({ habitId, weekday }) => {
    const dates = [];
    let currentDate = creationDate;

    // Gerar todas as datas correspondentes ao dia da semana desde 01/01/2025 até hoje
    while (currentDate.isBefore(today)) {
      if (currentDate.day() === weekday) {
        // Adicionar a data aleatoriamente (50% de chance)
        if (Math.random() > 0.5) {
          dates.push(currentDate.format("YYYY-MM-DD"));
        }
      }
      currentDate = currentDate.add(1, "day");
    }

    return dates.map((date) => ({
      habitId,
      date,
    }));
  });

  await db.insert(habitDays).values(dayHabitsData);
};
