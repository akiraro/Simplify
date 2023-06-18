import { Card } from '@/components/Card'
import useReport from '@/hooks/useReport'
import { REPORT_TYPE_DAY } from '@/lib/constants'
import { ShortUrl } from '@/lib/interfaces'
import { generateDate } from "@/utils/dateGenerator"
import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import MapChart from "./MapChart"

/**
 * Interfaces
 */
interface ReportProps {
	data: ShortUrl
}

/**
 * Local initial value
 */
const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(new Date().setDate(new Date().getDate() - 7))
}

const initialReport = {
	visits: [],
	geolocations: []
}

const Report = ({ data }: ReportProps) => {
	const [dateRange, setDateRange] = useState(initialDateRange)
	const { data: reportData = initialReport, error, isLoading } = useReport(data.id, REPORT_TYPE_DAY)
	const generalReport = generateDate(reportData.visits, dateRange)

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
			<Card className="mt-5">
				Geolocation
				<MapChart geolocations={reportData.geolocations} />
			</Card>
		</>
	)
}


export default Report