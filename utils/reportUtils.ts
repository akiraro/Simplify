import { Report, DateRange } from '@/lib/interfaces'
import { formatFullDate, formatMonthDate } from "./dateUtils"
import { REPORT_TYPE_WEEKLY } from "@/lib/constants"
import moment from 'moment'

interface DateReport {
	name: string,
	visit: number
}

export const generateReport = (reports: Report[], range: DateRange, type: string) => {
	const retVal: DateReport[] = []
	const endDate = new Date(range.endDate.getTime())
	
	for (let i = 0; i < 7; i++){
		retVal.push({
			name: type === REPORT_TYPE_WEEKLY ? formatFullDate(endDate): formatMonthDate(endDate),
			visit: 0
		})

		type === REPORT_TYPE_WEEKLY 
			? endDate.setDate(endDate.getDate() - 1)
			: endDate.setMonth(endDate.getMonth() - 1)

	}
	
	reports.forEach((report) => {
		const formattedDate =  
			type === REPORT_TYPE_WEEKLY 
				? formatFullDate(moment(report._id, "MM-DD-YYYY").toDate())
				: formatMonthDate(moment(report._id, "MM-YYYY").toDate())

		retVal.forEach((date) => {

			if (date.name == formattedDate){
				date.visit = report.count
			}
		})
	})

	return retVal.reverse()
}
