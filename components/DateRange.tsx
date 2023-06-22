import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { formatDate } from "@/utils/dateGenerator"
import { REPORT_TYPE_MONTHLY, REPORT_TYPE_WEEKLY } from '@/lib/constants'
import moment from "moment";

interface DateRangeProps {
	dateRange: Record<string, Date>
	onDateChanged: Function
	dateType: string
}

type rangeType = 'increment' | 'decrement'

const DateRange: React.FC<DateRangeProps> = ({dateRange, onDateChanged, dateType}) => {

	const onRangeClicked = (type: rangeType) => {
		if (type === 'increment'){
			onDateChanged({
				startDate: moment(dateRange.startDate).add(dateType === REPORT_TYPE_WEEKLY ? 1 : 4, "weeks").toDate(),
				endDate: moment(dateRange.endDate).add(dateType === REPORT_TYPE_WEEKLY ? 1 : 4, "weeks").toDate()
			})
		}else{
			onDateChanged({
				startDate: moment(dateRange.startDate).subtract(dateType === REPORT_TYPE_WEEKLY ? 1 : 4, "weeks").toDate(),
				endDate: moment(dateRange.endDate).subtract(dateType === REPORT_TYPE_WEEKLY ? 1 : 4, "weeks").toDate()
			})
		}
	}
	
	return (
		<div className="flex flex-row justify-between items-center">
			<BiChevronLeft size={20} className="cursor-pointer hover:opacity-70" onClick={() => onRangeClicked('decrement')} />
			<div className="px-6">{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</div>
			<BiChevronRight size={20} className="cursor-pointer hover:opacity-70" onClick={() => onRangeClicked('increment')}/>
		</div>
	)
}


export default DateRange