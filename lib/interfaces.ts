export interface ShortUrl {
	id: string
	originalUrl: string
	slug: string
	createdAt: string
}

export interface Report {
	_id: string
	count: number
}

export interface DateRange { 
	startDate: Date
	endDate: Date
}