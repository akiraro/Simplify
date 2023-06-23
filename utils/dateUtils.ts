import { Report, DateRange } from '@/lib/interfaces'


export const formatDate = (date: Date | string) => {

	if (typeof date == 'string'){
		date = new Date(date)
	}
	

	return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}
