import { Card } from '@/components/Card'
import useReport from '@/hooks/useReport'
import { REPORT_TYPE_MONTHLY, REPORT_TYPE_WEEKLY } from '@/lib/constants'
import { ShortUrl } from '@/lib/interfaces'
import { formatFullDate } from "@/utils/dateUtils"
import { generateReport } from "@/utils/reportUtils"
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
	startDate: new Date(new Date().setDate(new Date().getDate() - 6)),
}

const initialReport = {
	visits: [],
	geolocations: []
}

const initialQueryParams = {
	type: REPORT_TYPE_WEEKLY,
	date: formatFullDate(new Date())
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
	let generalReport = generateReport(reportData.visits, dateRange, reportType)

	useEffect(() => {
		setQueryParams({
			type: reportType,
			date: formatFullDate(dateRange.endDate)
		})
		mutate()
	}, [dateRange, reportType, mutate, isLoading])

	useEffect(() => {
		generalReport = generateReport(reportData.visits, dateRange, reportType)
	}, [reportData])


	const handleReportTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReportType((prevValue) => {
			if (prevValue === REPORT_TYPE_WEEKLY) {
				setDateRange({
					endDate: new Date(),
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
				})
				return REPORT_TYPE_MONTHLY
			} else {
				setDateRange({
					endDate: new Date(),
					startDate: new Date(new Date().setDate(new Date().getDate() - 6)),
				})
				return REPORT_TYPE_WEEKLY
			}
		})
	}

	const ReportType = () => {
		return (
			<div className="w-full text-center sm:w-auto sm:pb-0">
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

			<Card className="mt-5 flex flex-wrap justify-between rounded-b-none border-b-2">
				<div className="text-3xl font-bold w-full text-center pb-3 sm:w-auto sm:pb-0">Report</div>
				<DateRange className="w-full text-center pb-3 sm:w-auto sm:pb-0" dateRange={dateRange} onDateChanged={setDateRange} dateType={reportType} />
				<ReportType/>
			</Card>

			<Card className="rounded-t-none overflow-scroll">
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

			<Card className="mt-5  overflow-scroll">
				<div className="m-2">Geolocation</div>
				<MapChart geolocations={reportData.geolocations} />
			</Card>
		</>
	)
}


export default Report