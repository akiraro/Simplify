import { Report, DateRange } from '@/lib/interfaces'


export const formatDate = (date: Date | string) => {

	if (typeof date == 'string'){
		date = new Date(date)
	}
	

	return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

interface DateReport {
	name: string,
	visit: number
}

export const generateDate = (reports: Report[], range: DateRange) => {
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
