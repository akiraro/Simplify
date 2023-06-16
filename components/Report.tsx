import { Card } from '@/components/Card'
import useReport from '@/hooks/useReport'
import { REPORT_TYPE_DAY } from '@/lib/constants'
import { ShortUrl } from '@/lib/interfaces'
import { generateDate } from "@/utils/dateGenerator"
import { useState } from "react"
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts"

interface ReportProps {
	data: ShortUrl
}

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(new Date().setDate(new Date().getDate() - 7))
}

const Report = ({ data }: ReportProps) => {
	const [dateRange, setDateRange] = useState(initialDateRange)
	const { data: report = [], error, isLoading } = useReport(data.id, REPORT_TYPE_DAY)
	const generalReport = generateDate(report, dateRange)

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
				<ResponsiveContainer minHeight={300} minWidth={300} width="100%" height="80%">
					<BarChart data={generalReport} >
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="visit" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</Card>
		</>
	)
}


export default Report