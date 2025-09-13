"use client";

import { Check } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const HabitForm = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await fetch("habits", {
      method: "POST",
      body: JSON.stringify({
        title,
        weekDays,
      }),
    });

    setTitle("");
    setWeekDays([]);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <Label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </Label>
      <Input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-6 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700! focus:ring-offset-2 focus:ring-offset-zinc-900"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label className="font-semibold leading-tight mt-4">
        Qual a recorrência
      </Label>
      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Label
            key={weekDay}
            className="flex items-center gap-3 group focus:outline-none max-sm:justify-start"
          >
            <Checkbox
              className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 transition-colors focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            />
            <span className="text-white leading-tight">{weekDay}</span>
          </Label>
        ))}
      </div>

      <Button
        type="submit"
        className="mt-6 rounded-lg p-6 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} />
        Confirmar
      </Button>
    </form>
  );
};
