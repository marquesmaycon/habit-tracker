CREATE TABLE "day_habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"day_id" integer NOT NULL,
	"habit_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "day_habits_day_id_habit_id_unique" UNIQUE("day_id","habit_id")
);
--> statement-breakpoint
CREATE TABLE "days" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	CONSTRAINT "days_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "habit_week_days" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer NOT NULL,
	"week_day" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "habit_week_days_habit_id_week_day_unique" UNIQUE("habit_id","week_day")
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_day_id_days_id_fk" FOREIGN KEY ("day_id") REFERENCES "public"."days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_week_days" ADD CONSTRAINT "habit_week_days_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE cascade ON UPDATE no action;