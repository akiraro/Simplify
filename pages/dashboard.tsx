
import Navbar from "@/components/Navbar";
import Report from '@/components/Report';
import useUrls from "@/hooks/useUrls";
import { ShortUrl } from '@/lib/interfaces';
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from 'react';
import { formatDate } from '@/utils/dateGenerator'

const initialUrlState: ShortUrl = {
	id: '',
	originalUrl: '',
	slug: '',
	createdAt: ''
}

const Dashboard = () => {
	const { data = [], error, isLoading } = useUrls()
	const [urlData, setUrlData] = useState<ShortUrl>(initialUrlState)

	return (
		<div className="relative h-screen w-full bg-gradient-to-t from-[#3b82f6] to-[#2dd4bf] flex flex-col overflow-auto">
			<Navbar />
			<div className="h-full px-12">
				<div className="text-white italic text-3xl font-bold">URL Report</div>

				<div className="border-solid border-slate-200 border-2 flex rounded-md">
					<ul className="w-1/6 border-solid border-white border-r-2 bg-slate-200 opacity-80">
						{data.map((url: ShortUrl) => (
							<li
								key={url.id}
								className={`${urlData.id == url.id ? 'bg-slate-300': ''} p-4 border-solid border-white border-b-2 cursor-pointer hover:opacity-80`}
								onClick={() => { setUrlData(url) }}
							>
								<div className="flex flex-col">
									<div className={`${urlData.id == url.id ? 'text-[#3b82f6]': ''} text-2xl font-bold`}>{url.slug}</div>
									<div className={`${urlData.id == url.id ? 'text-[#3b82f6]': ''} italic`}>{formatDate(url.createdAt)}</div>
								</div>
							</li>
						))}
					</ul>
					<div className="w-5/6 p-5 bg-slate-200 opacity-80">
						{urlData.id == '' && 'No url is selected'}
						{urlData.id != '' &&
							<Report data={urlData} />
						}
					</div>
				</div>

			</div>
		</div>
	)
}

export default Dashboard

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return {
		props: {
			domain: process.env.DOMAIN || ''
		}
	}
}