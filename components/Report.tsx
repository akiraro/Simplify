import { Card } from '@/components/Card'
import useReport from '@/hooks/useReport'
import { REPORT_TYPE_MONTHLY, REPORT_TYPE_WEEKLY } from '@/lib/constants'
import { ShortUrl } from '@/lib/interfaces'
import { formatDate, generateDate } from "@/utils/dateGenerator"
import Switch from '@mui/material/Switch'
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import DateRange from "./DateRange"
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
	endDate: new Date(),
	startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
}

const initialReport = {
	visits: [],
	geolocations: []
}

const initialQueryParams = {
	type: REPORT_TYPE_WEEKLY,
	date: formatDate(new Date())
}

/**
 * React component
 */



const Report = ({ data }: ReportProps) => {
	const [dateRange, setDateRange] = useState(initialDateRange)
	const [reportType, setReportType] = useState(REPORT_TYPE_WEEKLY)
	const [queryParams, setQueryParams] = useState(initialQueryParams)
	const {
		data: reportData = initialReport,
		mutate,
		error,
		isLoading
	} = useReport(data.id, queryParams)
	const generalReport = generateDate(reportData.visits, dateRange)

	useEffect(() => {
		setQueryParams({
			type: reportType,
			date: formatDate(dateRange.endDate)
		})
		mutate()
	}, [dateRange, reportType])

	const handleReportTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReportType((prevValue) => {
			if (prevValue === REPORT_TYPE_WEEKLY) {
				return REPORT_TYPE_MONTHLY
			} else {
				return REPORT_TYPE_WEEKLY
			}
		})
	}

	const ReportType = () => {
		return (
			<div>
				<span>Weekly</span>
				<Switch
					checked={reportType === REPORT_TYPE_WEEKLY ? false : true}
					onChange={handleReportTypeChange}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				<span>Monthly</span>
			</div>
		)
	}

	return (
		<>
			<Card>
				<div className="flex flex-col">
					<div className="text-black text-2xl">{data.slug}</div>
					<div className="text-slate-500 text-lg">{data.originalUrl}</div>
				</div>
			</Card>

			<Card className="mt-5 flex justify-between rounded-b-none border-b-2">
				<div className="text-3xl font-bold">Report</div>
				<DateRange dateRange={dateRange} onDateChanged={setDateRange} dateType={reportType} />
				<ReportType />
			</Card>

			<Card className="rounded-t-none">
				<div className="m-2">Visit count</div>
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
				<div className="m-2">Geolocation</div>
				<MapChart geolocations={reportData.geolocations} />
			</Card>
		</>
	)
}


export default Report