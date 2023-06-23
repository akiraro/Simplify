import { Report, DateRange } from '@/lib/interfaces'
import { formatDate } from "./dateUtils"

interface DateReport {
	name: string,
	visit: number
}

export const generateReport = (reports: Report[], range: DateRange) => {
	const retVal: DateReport[] = []
	const startDate = new Date(range.startDate.getTime())

	for (let i = 0; i < 7; i++){
		retVal.push({
			name: formatDate(startDate),
			visit: 0
		})
		startDate.setDate(startDate.getDate() + 1)
	}

	reports.forEach((report) => {
		const formattedDate = formatDate(new Date(report._id))

		retVal.forEach((date) => {
			if (date.name == formattedDate){
				date.visit = report.count
			}
		})
	})

	return retVal
}