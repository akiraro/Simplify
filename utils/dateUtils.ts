export const formatFullDate = (date: Date | string) => {

	if (typeof date == 'string'){
		date = new Date(date)
	}
	

	return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

export const formatMonthDate = (date: Date | string) => {

	if (typeof date == 'string'){
		date = new Date(date)
	}
	

	return (date.getMonth() + 1) + '/' + date.getFullYear()
}
