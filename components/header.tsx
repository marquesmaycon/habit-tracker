import Image from "next/image";
import { HabitForm } from "./habit-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <Image src="/logo.svg" alt="Habits logo" width={100} height={100} />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-zinc-800 text-white/80 hover:bg-zinc-700">
            Novo hábito
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar hábito</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <HabitForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
