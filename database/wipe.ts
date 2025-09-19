import { db } from "./drizzle"
import { dayHabits, days, habits, habitWeekDays } from "./schemas"

export const refreshDatabase = async () => {
  console.log("🗑️ Iniciando limpeza do banco de dados...")

  try {
    // Deletar dados das tabelas na ordem correta para respeitar as foreign keys
    // Como temos cascade, podemos deletar na ordem: tabelas filhas primeiro

    console.log("   Deletando registros de day_habits...")
    await db.delete(dayHabits)

    console.log("   Deletando registros de habit_week_days...")
    await db.delete(habitWeekDays)

    console.log("   Deletando registros de days...")
    await db.delete(days)

    console.log("   Deletando registros de habits...")
    await db.delete(habits)

    console.log("✅ Banco de dados resetado com sucesso!")
    console.log("📊 Todas as tabelas foram limpas")
  } catch (error) {
    console.error("❌ Erro ao resetar banco de dados:", error)
    throw error
  }
}

export const main = async () => {
  await refreshDatabase()
}

if (require.main === module) {
  // Executar a limpeza se chamado diretamente
  console.log("🔄 Iniciando reset do banco de dados...")
  main()
    .then(() => {
      console.log("🎉 Processo de reset concluído!")
      process.exit(0)
    })
    .catch((error) => {
      console.error("❌ Erro durante o reset:", error)
      process.exit(1)
    })
}
