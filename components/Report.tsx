import React from 'react'
import { Card } from '@/components/Card'
import { ShortUrl } from '@/lib/interfaces'

interface ReportProps {
	data: ShortUrl
}

export const Report = ({data}: ReportProps) => {
	return (
	<>
		<Card>
			<div className="flex flex-col">
				<div className="text-black text-2xl">{data.slug}</div>
				<div className="text-slate-500 text-lg">{data.originalUrl}</div>
			</div>
		</Card>
		<Card className="mt-5">
			Statistics
		</Card>
	</>
	)
}
