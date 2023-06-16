export interface ShortUrl {
	id: string
	originalUrl: string
	slug: string
}

export interface Report {
	_id: string
	count: number
}

export interface DateRange { 
	startDate: Date
	endDate: Date
}