import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

// default timezone da sua aplicação
dayjs.tz.setDefault("America/Sao_Paulo")

export { dayjs }
