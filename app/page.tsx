import { Header } from "@/components/header";
import { SummaryTable } from "@/components/summary";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
