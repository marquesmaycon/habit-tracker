import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { habitDays, habits, habitWeekdays } from "@/database/schemas";

export async function GET() {
  const Allhabits = db
    .select()
    .from(habits)
    .leftJoin(habitWeekdays, eq(habits.id, habitWeekdays.habitId))
    .leftJoin(habitDays, eq(habits.id, habitDays.habitId))
    .all();
  return NextResponse.json({ data: Allhabits });
}
