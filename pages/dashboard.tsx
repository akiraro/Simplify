
import Navbar from "@/components/Navbar";
import Report from '@/components/Report';
import useUrls from "@/hooks/useUrls";
import { ShortUrl } from '@/lib/interfaces';
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from 'react';

const initialUrlState: ShortUrl = {
	id: '',
	originalUrl: '',
	slug: ''
}

const dashboard = () => {
	const { data = [], error, isLoading } = useUrls()
	const [urlData, setUrlData] = useState<ShortUrl>(initialUrlState)

	return (
		<div className="relative h-screen w-full bg-gradient-to-t from-[#3b82f6] to-[#2dd4bf] flex flex-col">
			<Navbar />
			<div className="h-full px-12 ">
				<div className="text-white italic text-lg">Links Statistic</div>

				<div className="border-solid border-slate-200 border-2 flex rounded-md">
					<ul className="w-1/6 border-solid border-white border-r-2 bg-slate-200 opacity-80">
						{data.map((url: ShortUrl) => (
							<li
								key={url.id}
								className="p-4 border-solid border-white border-b-2 cursor-pointer"
								onClick={() => { setUrlData(url) }}
							>{url.slug}</li>
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

export default dashboard

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